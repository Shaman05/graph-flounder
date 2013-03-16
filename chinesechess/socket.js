/**
 * Created with JetBrains WebStorm.
 * User: shaman
 * Date: 3/15/13
 * Time: 4:12 PM
 * To change this template use File | Settings | File Templates.
 */

var io = require('socket.io'),
    isRedSelected = false,
    isBlackSelected = false;

var userList = {length:0};

function start(server){
    io.listen(server).on('connection', function(socket){
        userList.length ++;
        userList[socket.id] = {
            id: socket.id
        };

        socket.broadcast.emit('join', {
            id: socket.id,
            list: userList
        });

        socket.on('message', function(data){
            var d = JSON.parse(data);
            actionMap[d.action](d);
        });

        socket.on('choose-type', function(type){
            red = (type == 'red');
            black = (type == 'black');
            socket.emit('choose-type', {
                red: red,
                black: black
            });
        });

        socket.on('disconnect', function(){
            socket.broadcast.emit('logout', {id: socket.id});
            delete userList[socket.id];
            userList.length --;
        });

        var actionMap = {
            'choose-type': function(data){
                var type = data.type;
                var sendType = null;
                if(!isRedSelected && (type == 'red')){
                    sendType = 'red';
                }else if(!isBlackSelected && (type == 'black')){
                    sendType = 'black';
                }else{
                    sendType = "viewer";
                }
                socket.emit('choose-type', sendType);
            },

            'speak': function(data){
                socket.broadcast.emit('speak', {
                    id: socket.id,
                    text: filterHtml(data.text)
                });
            }
        };

    });
}

function filterHtml(html){
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

exports.start = start;