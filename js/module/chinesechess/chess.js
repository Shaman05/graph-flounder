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
            chess.data('posit',{x:this.x,y:this.y});
            chess.data('type',this.type);
            chess.data('name',this.name);
            chess.click(function(){
                console.log(board.selectedObj && board.selectedObj.id === this.id);
                //board.selectedObj = this;
                //console.log(this.id, board.selectedObj.id);
                board.selectedObj = board.selectedObj && board.selectedObj.id === this.id ? null : this;
                if(data.player.type != board.currentType){
                    alert('轮到对方走棋！');
                }else{
                    if(_this.type == data.player.type)
                        rectUnit.show().attr({x:offsetX + baseSize * _this.x,y:offsetY + baseSize * _this.y});
                    //console.log(this.id, board.selectedObj);
                    if(board.selectedObj && this.id === board.selectedObj.id)
                        rectUnit.hide();
                }
                //todo...
            });
        }
    };

    module.exports = Chess;

});