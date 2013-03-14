/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:59
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    var board = require('./chessboard');
    var rectUnit = board.rectUnit;
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
        this.id = null;
        this.init();
    }

    Chess.prototype = {
        init: function(){
            var _this = this;
            var imgUrl = imgPath + this.type + '_' + this.name + '.png';
            var offsetX = baseSize/2 + 10;
            var offsetY = baseSize/2 + 10;
            var chess = canvas.image(imgUrl, offsetX + baseSize * this.x, offsetY + baseSize * this.y, this.size, this.size).attr('cursor','pointer');
            this.id = chess.id;
            if(this.y < 5){ //对手棋子反转
                chess.transform('r180');
            }
            chess.toFront();
            chess.data('posit',{x:this.x,y:this.y});
            chess.click(function(){
                var _self = this;
                if(data.player.type != board.currentType){
                    alert('轮到对方走棋！');
                }else{
                    var toPoint = {x:_self.attr("x"),y:_self.attr("y")};
                    if(_this.type == data.player.type){ //选棋
                        rectUnit.show().attr(toPoint).toFront();
                        board.selectedObj = _self;
                    }else{ //吃子
                        board.selectedObj.animate(toPoint,300,function(){
                            //todo : send message

                            board.resetRectUnit();
                            _self.remove();
                        });
                    }
                }
            });
        }
    };

    module.exports = Chess;

});