/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:57
 * To change this template use File | Settings | File Templates.
 */

;(function(){

    var panel = $('panel');

    seajs.config({
        base: './js/module/chinesechess/',
        debug: true
    });

    seajs.use(['chessboard','chess','data'], function(board, chess, data){
        board.init();

        panel.onclick = function(e){
            var evt = e || window.event;
            var _this = evt.target;
            if(_this.getAttribute('type') == 'radio'){
                composition(_this.value);
            }
        };

        function composition(camp){
            var radios = panel.getElementsByTagName('input');
            radios[0].disabled = true;
            radios[1].disabled = true;
            data.player.type = camp;
            data.player.canMove = (camp == 'red');
            board.createChess(camp, chess);
        }
    });

    function $(id){
        return document.getElementById(id);
    }

})();