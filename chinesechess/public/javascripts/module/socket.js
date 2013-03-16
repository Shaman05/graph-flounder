/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-16
 * Time: 下午6:09
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    var data = require('./data');
    var help = require('./help');
    var board = require('./chessboard');
    var chess = require('./chess');
    var $sendBtn = $('#sendBtn');

    //创建客户端socket
    var socket = io.connect();

    module.exports = {

        init: function(){
            help.msg('正在连接服务器，请稍后...', 'sys', 'tip');
            socket.on('connect', function(){
                help.msg('已连接！', 'sys', 'tip');
                $sendBtn.attr('disabled', false);
            });
            socket.on('error', function(){
                help.msg('socket连接出错！', 'sys', 'error');
            });
            socket.on('disconnect', function(){
                help.msg('连接已断开！', 'sys', 'error');
                $sendBtn.attr('disabled', true);
            });
            socket.on('join', function(data){
                help.msg(data.id + ' 加入了游戏！', 'sys', 'tip');
                //todo : 更新在线列表 data.list
            });
            socket.on('logout', function(data){
                help.msg(data.id + ' 退出了游戏！', 'sys', 'tip');
                //todo : 更新在线列表 data.list
            });
            socket.on('speak', function(data){
                help.msg(' 说：' + data.text, data.id, 'user');
            });
            socket.on('rename', function(data){
                help.msg(data.id + ' 已改名为：' + data.newName, 'sys', 'tip');
            });
            socket.on('choose-type', function(camp){
                if(camp !== "viewer"){
                    //todo : 由系统分配持棋颜色
                    data.player.type = camp;
                    data.player.canMove = (camp == 'red');
                    board.createChess(camp, chess);
                }else{ //观看者默认以红棋视角观看，并且禁止走棋
                    data.player.type = 'red';
                    data.player.canMove = false;
                    board.createChess('red', chess);
                }
            });
        },

        sendMessage: function(data){
            var cmd = data.text;
            switch (cmd){
                case '-help':
                    help.showHelp();
                    break;
                case '-clear':
                    help.clear();
                    break;
                default :
                    sendMessage(data);
            }
        },

        sendAction: function(data){
            socket.send(JSON.stringify(data));
        },

        playerSocket: function(){
            //todo ...
        }

    };

    function sendMessage(data){
        var text = data.text;
        var newData= {};
        var regExp = /^-rename [0-9a-zA-Z]{1,8}$/;
        if(regExp.test(text)){
            newData.action = 'rename';
            newData.name = regExp.exec(text)[0].split(' ')[1];
            socket.send(JSON.stringify(newData));
            help.msg(' 您已经改名为：' + newData.name, 'sys', 'tip');
        }else{
            socket.send(JSON.stringify(data));
            help.msg(' 说：' + text, '你', 'user');
        }

    }

});