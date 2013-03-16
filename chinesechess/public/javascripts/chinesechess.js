/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:57
 * To change this template use File | Settings | File Templates.
 */

;(function(){

    var $panel = $('#panel');
    var $sendBtn = $('#sendBtn');
    var $input = $('#input');

    seajs.config({
        base: './javascripts/module/',
        debug: true
    });

    seajs.use(['chessboard','chess','data'], function(board, chess, data){
        //init
        board.init();
        $('#gameType').attr('selectedIndex', 0);
        $('#viewer,#red,#black').attr('disabled', false);
        $('#viewer').attr('checked', true);

        //socket
        var socket = io.connect();
        board.msg('正在连接服务器，请稍后...', 'sys', 'tip');
        socket.on('connect', function(){
            board.msg('已连接！', 'sys', 'tip');
            $sendBtn.attr('disabled', false);
        });
        socket.on('disconnect', function(){
            board.msg('连接已断开！', 'sys', 'error');
            $sendBtn.attr('disabled', true);
        });
        socket.on('join', function(data){
            board.msg(data.id + ' 加入了游戏！', 'sys', 'tip');
        });
        socket.on('logout', function(data){
            board.msg(data.id + ' 退出了游戏！', 'sys', 'tip');
        });
        socket.on('speak', function(data){
            board.msg(' 说：' + data.text, data.id, 'user');
        });
        socket.on('choose-type', function(camp){
            console.log(camp);
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

        //event
        $panel.click(function(e){
            var _this = $(e.target);
            if(_this.attr('type') == 'radio'){
                $('#viewer,#red,#black').attr('disabled', true);
                sendMessage({
                    action: 'choose-type',
                    type: _this.val()
                });
            }
        });

        $sendBtn.click(function(){
            var text = $.trim($input.val());
            //todo : 过滤内容
            text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            if(!text)return;
            sendMessage({
                action: 'speak',
                text: text
            });
            board.msg(' 说：' + text, '你', 'user');
        });

        function sendMessage(data){
            socket.send(JSON.stringify(data));
            $input.val('');
        }

    });

})();