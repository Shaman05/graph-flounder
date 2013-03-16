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

    seajs.use(['data','help', 'chessboard','chess', 'socket'], function( data, help, board, chess, socket){
        //init
        board.init();
        help.resetRadio();

        //socket
        socket.init();

        //event
        $panel.click(function(e){
            var _this = $(e.target);
            if(_this.attr('type') == 'radio'){
                help.disableRadio();
                socket.sendData({
                    action: 'choose-type',
                    type: _this.val()
                });
            }
        });
        $sendBtn.click(function(){
            var text = $.trim($input.val());
            if(!text)return;
            text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            socket.sendData({
                action: 'speak',
                text: text
            });
            help.msg(' 说：' + text, '你', 'user');
            $input.val('');
        });

    });

})();