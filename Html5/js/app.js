/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-9-6
 * Time: 下午8:26
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */
define(function(require, exports, module){

    var MAP_W = 320;
    var MAP_H = 480;
    var imgSize_bg_W = 480;
    var imgSize_bg_H = 850;
    var source = require("source");
    var panel = require("panel");
    var enemy = require("enemy");
    var stageBg = document.getElementById("bg").getContext("2d");
    var stageFighter = document.getElementById("fighter").getContext("2d");
    var stagePanel = document.getElementById("panel").getContext("2d");

    //定时器
    var Timer = {
        timer: null,
        commonFps: 5,
        count: 0,
        sprites: [],
        isPaused: false,
        addSprites: function(spriteName, sprite, fps){
            this.sprites.push({n: spriteName, s: sprite, f: fps});
        },
        removeSprte: function(spriteName){
            var sprites = this.sprites;
            for(var i = 0, len = sprites.length; i < len; i++){
                if(spriteName === sprites[i].n){
                    stageFighter.clearRect(0, 0, MAP_W, MAP_H);
                    sprites.splice(i, 1);
                    break;
                }
            }
        },
        run: function(){
            var that = this;
            var sprites = that.sprites;
            that.timer = setInterval(function(){
                if(!that.isPaused){
                    for(var i = 0, len = sprites.length; i < len; i++){
                        var sprite = sprites[i];
                        if(that.count % sprite.f === 0){
                            sprite.s();
                        }
                    }
                    that.count += that.commonFps;
                }
            }, that.commonFps);
        },
        toggle: function(){
            this.isPaused = !this.isPaused;
            //todo 改变图标
        }
    };

    module.exports = {
        init: function(){
            //设置游戏区域
            stageBg.canvas.width = MAP_W;
            stageBg.canvas.height = MAP_H;
            stageFighter.canvas.width = MAP_W;
            stageFighter.canvas.height = MAP_H;
            stagePanel.canvas.width = MAP_W;
            stagePanel.canvas.height = MAP_H;

            //初始化
            source.getImgObject(function(){
                var imgObj = this;
                //背景图动画
                var spriteBg = function(){
                    var offset = 1;
                    var scaleH = imgSize_bg_H / MAP_H;
                    return function(){
                        stageBg.clearRect(0, 0, MAP_W, MAP_H);
                        stageBg.drawImage(imgObj, 544, imgSize_bg_H - scaleH * offset, imgSize_bg_W, scaleH * offset, 0, 0, MAP_W, offset);
                        stageBg.drawImage(imgObj, 544, 0, imgSize_bg_W, imgSize_bg_H, 0, offset, MAP_W, MAP_H);
                        offset = offset >= MAP_H ? 1 : offset + 1;
                    }
                };
                //敌机
                var spriteEnemy = function(){
                    var offset = 0;
                    var left = Math.floor(Math.random() * (MAP_W - 49));
                    return function(){
                        stageFighter.clearRect(left, offset, 49, 50);
                        offset = offset > MAP_H ? 0 : offset + 1;
                        stageFighter.drawImage(imgObj, 0, 44, 49, 50, left, offset, 49, 50);
                    }
                };

                //添加背景图动画
                Timer.addSprites("bg", spriteBg(), 35);
                Timer.addSprites("enemy01", spriteEnemy(), 10);
                //启动游戏定时器
                Timer.run();
                //背景
                //ctx.drawImage(this, 544, 0, 480, 851, 0, 0, MAP_W, MAP_H);
                //暂停按钮
                panel.drawPause(stagePanel, this);
                //得分
                panel.updateScore(stagePanel, "0");
                //帧速率
                panel.updateFPS(0);
                //显示飞机
                //enemy.show(stageFighter);

                enemy.destroy(stageFighter, false);
            });
        }
    };

});