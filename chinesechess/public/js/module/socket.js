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
    var $sendBtn = $('#sendBtn');
    var $input = $('#input');

    //创建客户端socket
    var socket = io.connect();

    module.exports = {
        ws: socket,

        init: function(){
            help.msg('正在连接服务器，请稍后...', 'sys', 'tip');
            socket.on('connect', function(){
                help.msg('已连接到大厅！', 'sys', 'tip');
                $sendBtn.attr('disabled', false);
            });
            socket.on('error', function(){
                help.msg('socket连接出错！', 'sys', 'error');
            });
            socket.on('disconnect', function(){
                help.msg('连接已断开！', 'sys', 'error');
                $sendBtn.attr('disabled', true);
                $input.unbind();
            });
            socket.on('join', function(data){
                help.msg(data.id + ' 加入了游戏！', 'sys', 'tip');
                //todo : 更新在线列表 data.list
            });
            socket.on('choose-status', function(data){
                console.log(data);
                if(data.isRedSelected){
                    $('#redName').text(data.redPlayerName);
                    $('#redBtn').remove();
                }
                if(data.isBlackSelected){
                    $('#blackName').text(data.blackPlayerName);
                    $('#blackBtn').remove();
                }
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
            socket.on('assign-status', function(resData){
                var camp = resData.status;
                help.msg(resData.message, 'sys', 'tip');
                if(camp !== "viewer"){
                    //todo : 由系统分配持棋颜色
                    data.player.type = camp;
                    data.player.canMove = (camp == 'red');
                }else{ //观看者默认以红棋视角观看，并且禁止走棋
                    data.player.type = 'red';
                    data.player.canMove = false;
                }
            });
            socket.on('other-choose-type', function(resData){
                help.msg(resData.message, 'sys', 'tip');
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

        player: {
            move: function(){

            },
            eat: function(){

            }
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
            help.msg('说：' + text, '你', 'user');
        }

    }

});