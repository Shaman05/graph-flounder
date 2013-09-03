/**
 * Created with JetBrains WebStorm.
 * User: shaman
 * Date: 3/15/13
 * Time: 4:12 PM
 * To change this template use File | Settings | File Templates.
 */

var io = require('socket.io');

//用户在线列表
var userList = {
    length: 0,
    isRedSelected: false,
    isBlackSelected: false,
    redPlayerName: '',
    blackPlayerName: ''
};

function start(server){
    io.listen(server).on('connection', function(socket){
        //添加到在线列表
        userList.length ++;
        userList[socket.id] = {
            id: socket.id,      //id
            name: null,         //昵称
            status: 'viewer'    //身份 viewer|red|black
        };

        socket.emit('choose-status', {
            isRedSelected: userList.isRedSelected,
            isBlackSelected: userList.isBlackSelected,
            redPlayerName: userList.redPlayerName,
            blackPlayerName: userList.blackPlayerName
        });

        //有新用户加入广播, 并发送新的用户列表
        socket.broadcast.emit('join', {
            id: socket.id,
            list: userList
        });

        //message事件
        socket.on('message', function(data){
            console.log('......' + data);
            var d = JSON.parse(data);
            actionMap[d.action](d);  //映射用户动作
        });

        //删除断开连接用户, 并发送新的用户列表
        socket.on('disconnect', function(){
            delete userList[socket.id];
            userList.length --;
            socket.broadcast.emit('logout', {
                id: socket.id,
                list: userList
            });
        });

        socket.on('choose', function(camp){
            var id = socket.id;
            if(camp === 'red'){
                userList.isRedSelected = true;
                userList.redPlayerName = id;
            }
            if(camp === 'black'){
                userList.isBlackSelected = true;
                userList.blackPlayerName = id;
            }
        });

        //用户动作
        var actionMap = {
            'speak': function(data){
                var name = userList[socket.id].name;
                socket.broadcast.emit('speak', {
                    id: name || socket.id,
                    text: filterHtml(data.text)
                });
            },

            'rename': function(data){
                var name = userList[socket.id].name;
                userList[socket.id].name = data.name;  //修改用户名
                socket.broadcast.emit('rename', {
                    id: name || socket.id,
                    newName: data.name
                });
            }
        };

    });
}

function filterHtml(html){
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

exports.start = start;