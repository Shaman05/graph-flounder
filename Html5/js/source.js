/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-9-6
 * Time: 下午11:31
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

define(function(require, exports, module){

    var SPRITE_IMG = "./image/sprite.png";

    module.exports = {
        getImgObject: function(callback){
            return preLoadImg(SPRITE_IMG, callback);
        }
    };

    function preLoadImg(url, callback){
        var img = new Image();
        img.src = url;
        if(img.complete){
            callback.call(img);
            return;
        }
        img.onload = function(){
            callback.call(img);
        }
    }

});