/**
 * Created with JetBrains WebStorm.
 * User: shaman
 * Date: 3/15/13
 * Time: 4:12 PM
 * To change this template use File | Settings | File Templates.
 */

var io = require('socket.io');

function start(server){
    io.listen(server).on('connection', function(socket){
        var red = false,
            black = false;

        socket.on('choose-type', function(type){
            red = (type == 'red');
            black = (type == 'black');
            socket.emit('choose-type', {
                red: red,
                black: black
            });
        });

        socket.on('disconnect', function(){

        });
    });
}

exports.start = start;