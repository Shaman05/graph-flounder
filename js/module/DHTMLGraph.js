/**
 * Created with JetBrains PhpStorm.
 * User: Devin Chen
 * Date: 3/7/13
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){
    'use strict';

    /**
     * 私有方法：创建一个 sprite 对象
     * @param param
     * @return {Object}
     * @constructor
     */
    var MySprite = function(param){
        var $box = param.box;
        var h = param.height;
        var w = param.width;
        var url = param.imgUrl;
        var imgW = param.imgWidth;
        var defaultStyle = {
            'height': h,
            'width': w,
            'position': 'absolute',
            'backgroundImage': 'url(' + url + ')'
        };
        var $elem = $('<div></div>', {css: defaultStyle}).appendTo($box);
        var elemStyle = $elem[0].style;
        var mathFloor = Math.floor;
        return  {
            setPosition: function(x, y){
                elemStyle.left = x + 'px';
                elemStyle.top = y + 'px';
            },
            changeImg: function(index){
                index *= w;
                var x = - index % imgW;
                var y = - mathFloor(index/imgW) * h;
                elemStyle.backgroundPosition = x + 'px ' + y + 'px';
            },
            show: function(){
                elemStyle.display = 'block';
            },
            hide: function(){
                elemStyle.display = 'none';
            },
            toggle: function(){
                $elem.fadeToggle(500);
            },
            remove: function(){
                $elem.remove();
            }
        };
    };

    module.exports = {
        /**
         * 定义一个过渡动画, 如果是静止的, 则无需调用 move 方法
         * @param param 公用参数
         * @param extendParam 扩展参数
         * @return {*} 动画对象
         */
        CreateElem: function(param, extendParam){
            param.height = extendParam.size;
            param.width = extendParam.size;
            var index = extendParam.indexRange[0] - 1;
            var startIndex = extendParam.indexRange[0] - 1;
            var endIndex = extendParam.indexRange[1] - 1;
            var that = MySprite(param);
            var x = extendParam.x;
            var y = extendParam.y;
            var xDir = extendParam.xDir;
            var yDir = extendParam.yDir;
            var maxX = param.maxX;
            var maxY = param.maxY;
            that.setPosition(x, y);
            that.move = function(isCrash){
                index ++;
                index = index > endIndex ? startIndex : index;
                that.changeImg(index);
                if(isCrash){
                    x += xDir;
                    y += yDir;
                    if((xDir < 0 && x < 0) || (xDir > 0 && x >= maxX)){
                        xDir = -xDir;
                    }
                    if((yDir < 0 && y < 0) || (yDir > 0 && y >= maxY)){
                        yDir = -yDir;
                    }
                    that.setPosition(x, y);
                }
            };
            return that;
        },

        /**
         * 分组动画方法
         * @param objArr 动画对象集合
         * @param isCrash 是否碰撞
         * @constructor
         */
        Animate: function(objArr, isCrash){
            var _isCrash = isCrash || false;
            var len = objArr.length;
            while(len --){
                objArr[len].move(_isCrash);
            }
        },

        /**
         * sine 的查找表
         * @param steps 粒度(最低4095, 增大粒度能获得更平滑的效果)
         * @return {Array}
         */
        fastSin: function(steps){
            var table = [],
                ang = 0,
                angStep = (Math.PI * 2)/steps;
            do{
                table.push(Math.sin(ang));
                ang += angStep;
            }while(ang < Math.PI * 2);
            return table;
        }
    }
});