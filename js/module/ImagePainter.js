/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-9-6
 * Time: 下午11:54
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

define(function(require, exports, module){

    var ImgPainter = function(imgObject, cell, cells){
        this.image = imgObject;
        this.cell = cell;
        this.cells = cells || [];
        this.cellIndex = 0;
    };

    ImgPainter.prototype = {
        paint: function(sprite, context){
            var cell = this.cell;
            context.drawImage(this.image, cell.x, cell.y, cell.w, cell.h, sprite.left, sprite.top, cell.w, cell.h);
        },
        advance: function(){
            var currentIndex = this.cellIndex;
            this.cellIndex = currentIndex === this.cells.length -1 ? 0 : currentIndex + 1;
        },
        paintSheet: function(sprite, context){
            var cell = this.cells[this.cellIndex];
            context.drawImage(this.image, cell.x, cell.y, cell.w, cell.h, sprite.left, sprite.top, cell.w, cell.h);
        }
    };

    module.exports = ImgPainter;

});