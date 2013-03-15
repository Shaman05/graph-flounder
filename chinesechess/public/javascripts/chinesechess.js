/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:57
 * To change this template use File | Settings | File Templates.
 */

;(function(){

    var $panel = $('#panel');
    var $msgBox = $('#chatBox');

    seajs.config({
        base: './javascripts/module/',
        debug: true
    });

    seajs.use(['chessboard','chess','data'], function(board, chess, data){
        board.init();

        $('#gameType').attr('selectedIndex', 0);
        $('#viewer,#red,#black').attr('disabled', false);
        $('#viewer').attr('checked', true);

        $panel.click(function(e){
            var _this = $(e.target);
            if(_this.attr('type') == 'radio'){
                composition(_this.val());
            }
        });

        function composition(camp){
            $('#viewer,#red,#black').attr('disabled', true);
            $msgBox.prepend('<p class="tip">正在连接服务器，请稍后...</p>');

            var socket = io.connect();
            socket.on('connect', function(){
                $msgBox.prepend('<p class="tip">已连接！</p>');
                socket.emit('choose-type', camp);
            });
            socket.on('choose-type', function(data){
                console.log(data);
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
            socket.on('message', function(data){
                console.log(data);
            });
            socket.on('disconnect', function(){
                $msgBox.prepend('<p class="error">连接已断开！</p>');
            });
        }
    });

})();