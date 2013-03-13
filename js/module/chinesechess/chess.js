/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:59
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    var canvas = require('./chessboard').canvas;
    var data = require('./data');
    var size = data.pieces.size - 10;
    var imgPath = data.pieces.imagePath;

    function Chess(type, name, x, y){
        this.size = size;
        this.type = type;
        this.id = type + '_' + name;
        this.x = x;
        this.y = y;
        this.init();
    }

    Chess.prototype = {
        init: function(){
            var imgUrl = imgPath + this.id + '.png';
            canvas.image(imgUrl, this.x, this.y, this.size, this.size).attr('id', this.id);
        }
    };

    module.exports = Chess;

});