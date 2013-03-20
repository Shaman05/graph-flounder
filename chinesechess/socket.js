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
    isBlackSelected: false
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

        //用户动作
        var actionMap = {
            'choose-type': function(data){
                var type = data.type;
                var resData = {
                    type: 'viewer',
                    message: '你选择了' + type + '方'
                };
                console.log(userList.isRedSelected, '------------------------', userList.isBlackSelected);
                resData.type = type;
                if(type == 'viewer'){
                    resData.message = socket.id + '选择了观看者！';
                    socket.broadcast.emit('other-choose-type', resData);
                }else{
                    if(userList.isRedSelected && userList.isBlackSelected){
                        resData.type = 'viewer';
                        resData.message = '对不起，请您等待下一局！';
                    }
                    if(type == 'red' && userList.isRedSelected && !userList.isBlackSelected){
                        resData.type = 'black';
                        resData.message = '对不起，红方已有人选择，系统将您分配至黑方！';
                        userList.isBlackSelected = true;
                    }
                    if(type == 'black' && userList.isBlackSelected && !userList.isRedSelected){
                        resData.type = 'red';
                        resData.message = '对不起，黑方已有人选择，系统将您分配至红方！';
                        userList.isRedSelected = true;
                    }
                    socket.broadcast.emit('other-choose-type', {
                        type: resData.type,
                        message: socket.id + '选择了' + resData.type + '方！'
                    });
                }
                socket.emit('choose-type', resData);
            },

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