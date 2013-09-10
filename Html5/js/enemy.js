/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-9-6
 * Time: 下午11:10
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

define(function(require, exports, module){

    var E_PLANE_S_W = 49;
    var E_PLANE_S_H = 50;
    var POSITION_S_X = 0;
    var POSITION_S_Y = 44;
    var source = require("source");
    var Sprite = require("../../js/module/Sprite");
    var ImgPainter = require("../../js/module/ImagePainter");

    //敌机绘制器 小s, 中m, 大l
    var sPainter;
    var mPainter;
    var lPainter;
    var sPainterDestroy;
    source.getImgObject(function(){
        sPainter = new ImgPainter(this, {
            x: POSITION_S_X,
            y: POSITION_S_Y,
            w: E_PLANE_S_W,
            h: E_PLANE_S_H
        });
        sPainterDestroy = new ImgPainter(this, null, createPainterSheet(POSITION_S_X, POSITION_S_Y, E_PLANE_S_W, E_PLANE_S_H, 5));
    });

    module.exports = {
        show: function(context){
            var plane = new Sprite("plane", sPainter);
            plane.left = 100;
            plane.top = 100;
            plane.width = E_PLANE_S_W;
            plane.height = E_PLANE_S_H;
            plane.paint(context);
        },
        destroy: function(context, isLoop){
            var PAGE_FLIP_INTERVAL = 200; //动画帧速率
            var sprite = new Sprite('destroy', sPainterDestroy);
            var lastAdvance = 0;
            var paused = false;
            startAnimate();
            function startAnimate(){
                sprite.left = 100;
                sprite.top = 200;
                paused = false;
                window.requestAnimationFrame(animate);
            }
            function animate(time){
                context.clearRect(100, 200, E_PLANE_S_W, E_PLANE_S_H);
                if(!paused){
                    sprite.paintSheet(context, isLoop);
                    if(time - lastAdvance > PAGE_FLIP_INTERVAL){
                        sprite.painter.advance();
                        lastAdvance = time;
                    }
                    window.requestAnimationFrame(animate);
                }
            }
        }
    };

    function createPainterSheet(x, y, w, h, frame){
        var arr = [];
        for(var i = 0; i < frame; i++){
            arr.push({
                x: x + w * i,
                y: y,
                w: w,
                h: h
            });
        }
        return arr;
    }

});
