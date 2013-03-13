/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:59
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    var board = require('./chessboard');
    var canvas = board.canvas;
    var realMap = board.realMap;
    var data = require('./data');
    var baseSize = data.pieces.size;
    var size = baseSize - 10;
    var imgPath = data.pieces.imagePath;

    function Chess(type, name, x, y){
        this.size = size;
        this.type = type;
        this.name = name;
        this.x = x;
        this.y = y;
        this.init();
    }

    Chess.prototype = {
        init: function(){
            var imgUrl = imgPath + this.type + '_' + this.name + '.png';
            var offsetX = baseSize/2 + 10;
            var offsetY = baseSize/2 + 10;
            var chess = canvas.image(imgUrl, offsetX + baseSize * this.x, offsetY + baseSize * this.y, this.size, this.size);
            if(this.y < 5){ //对手棋子反转
                chess.transform('r180');
            }
            chess.data('posit',{x:this.x,y:this.y});
            chess.data('type',this.type);
            chess.data('name',this.name);
            chess.click(function(){
                board.selectedObj = this;
                if(data.player.type != board.currentType){
                    alert('轮到对方走棋！');
                }
                //todo...
            });
            realMap[this.y][this.x] = chess;
        }
    };

    module.exports = Chess;

});