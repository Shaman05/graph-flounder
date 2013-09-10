/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-9-6
 * Time: 下午11:06
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

define(function(require, exports, module){

    var PAUSED_W = 20;
    var PAUSED_H = 20;
    var FPS = document.getElementById("fps");

    module.exports = {
        drawPause: function(context, img){
            context.drawImage(img, 0, 0, 41, 41, 2, 2, PAUSED_W, PAUSED_H);
        },

        updateScore: function(context, score){
            context.font = "16pt Tekton pro";
            context.fillStyle = "#363636";
            context.fillText(score, 26, 20);
        },

        updateFPS: function(fps){
            FPS.innerHTML = fps;
        }
    };

});
