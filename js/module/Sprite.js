/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-9-6
 * Time: 下午8:33
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */
;define(function(require, exports, module){

    var Sprite = function(name, painter, behaviors){
        this.name = name || "";
        this.painter = painter || null;
        this.top = 0;
        this.left = 0;
        this.width = 10;
        this.height = 10;
        this.velocityX = 0;
        this.velocityY = 0;
        this.visible = true;
        this.animating = false;
        this.behaviors = behaviors || [];
    };

    Sprite.prototype = {
        paint: function(context){
            if(this.painter && this.visible){
                this.painter.paint(this, context);
            }
        },
        paintSheet: function(context){
            if(this.painter && this.visible){
                this.painter.paintSheet(this, context);
            }
        },
        update: function(context, time){
            for(var i = 0, len = this.behaviors.length; i < len; i++){
                this.behaviors[i].execute(this, context, time);
            }
        }
    };

    module.exports = Sprite;

});
