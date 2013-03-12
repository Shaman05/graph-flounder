/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午10:15
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    var data = require('./data');

    module.exports = {

        init: function(){
            this.draw();
        },

        draw: function(){
            drawBoard(data.pieces.size);
        }

    };

    function drawBoard(size){
        var box = document.getElementById('chessBoard');
        var width = size * 14;
        var height = size * 11;
        box.style.height = height + 'px';
        box.style.width = width + 'px';
        box.style.backgroundColor = data.style.bgColor;
        box.style.position = 'absolute';
        box.style.top = '50%';
        box.style.left = '50%';
        box.style.marginTop = - height/2 + 'px';
        box.style.marginLeft = - width/2 + 'px';
        var innerWidth = size * 8;
        var innerHeight = size * 9;
        var dx = size + 5;
        var dy = size + 5;
        var style = data.style;
        var strokeStyle = style.stroke;
        //创建画布
        var canvas = Raphael('chessBoard', size * 10, size * 11);
        //绘制外边框
        canvas.rect(size, size, innerWidth + 10, innerHeight + 10).attr(strokeStyle).attr(style.outLine);
        //绘制内边框
        canvas.rect(dx, dy, innerWidth, innerHeight).attr(strokeStyle);
        //绘制格子
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 8; j++){
                canvas.rect(dx + size * j, dy + size * i, size, size).attr(strokeStyle);
            }
        }
        //绘制楚河、汉界
        canvas.rect(dx, dy + size * 4, size * 8, size).attr(strokeStyle).attr(style.limit);
        canvas.text(dx + size * 2, dy + size * 4 + size/2, data.text.CH).attr(style.text);
        canvas.text(innerWidth - size, dy + size * 4 + size/2, data.text.HJ).attr(style.text).transform('r180');
    }

});
