/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 3/14/13
 * Time: 2:06 PM
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    'use strict';

    var data = require('./data');
    var help = require('./help');

    module.exports = {

        //检测是否能走棋到目标位置
        canMoveTo: function(startObj, endObj){
            var points = help.transformPoint(startObj, endObj);
            var code = startObj.data('code');
            var target = endObj.data('code');
            var x1 = points.x1, y1 = points.y1, x2 = points.x2, y2 = points.y2;
            var abs = Math.abs;
            var map = data.map;
            if(!target || (target && code < 20 && target > 20) || (target && code > 20 && code < 20)){
                //兵、卒
                if(code === 17 || code === 27){
                    var c = (y1 - y2 === 1) && (abs(x1 - x2) === 0);
                    if(y1 > 4){
                        return c;
                    }else{ //过河兵、卒
                        return c || (y1 - y2 === 0) && (abs(x1 - x2) === 1);
                    }
                }
                //车
                if(code === 11 || code === 21){
                    if(x1 === x2 || y1 === y2){
                        return (hasChessInMiddle(points) === 0)
                            || (code === 11 && target > 20 && hasChessInMiddle(points) === 1)
                            || (code === 21 && target < 20 && hasChessInMiddle(points) === 1);
                    }
                }
                //炮、跑（走法和车基本一样，只需要判断吃子的时候中间是否有且仅有一颗棋子）
                if(code === 16 || code === 26){
                    if(x1 === x2 || y1 === y2){
                        return (hasChessInMiddle(points) === 0)
                            || (code === 16 && target > 20 && hasChessInMiddle(points) === 2)
                            || (code === 26 && target < 20 && hasChessInMiddle(points) === 2);
                    }
                }
                //马走日字，分上下左右四个方向的马脚是否被撇
                if(code === 12 || code === 22){
                    //上
                    if((y1 - y2 === 2) && (abs(x1 - x2) === 1) && (map[y1-1][x1] === 0)){
                        return true;
                    }
                    //下
                    if((y2 - y1 === 2) && (abs(x1 - x2) === 1) && (map[y1+1][x1] === 0)){
                        return true;
                    }
                    //左
                    if((x1 - x2 === 2) && (abs(y1 - y2) === 1) && (map[y1][x1-1] === 0)){
                        return true;
                    }
                    //右
                    if((x2 - x1 === 2) && (abs(y1 - y2) === 1) && (map[y1][x1+1] === 0)){
                        return true;
                    }
                }
                //相、象走田字，分别判断两个方向的象眼是否被堵
                if(code === 13 || code === 23){
                    if(y2 < 5)return false; //不能过河
                    if((abs(x1 - x2) === 2) && (abs(y1 - y2) === 2)){
                        //左方向
                        if(x2 < x1){
                            if(y2 > y1)return map[y1+1][x1-1] === 0;
                            if(y2 < y1)return map[y1-1][x1-1] === 0;
                        }
                        //右方向
                        if(x2 > x1){
                            if(y2 > y1)return map[y1+1][x1+1] === 0;
                            if(y2 < y1)return map[y1-1][x1+1] === 0;
                        }
                    }
                }
                //仕、士走斜线，并且不能出宫
                if(code === 14 || code === 24){
                    if(x2 < 3 || x2 > 5 || y2 < 7)return false; //不能出宫
                    return (abs(x1 - x2) === 1) && (abs(y1 - y2) === 1);
                }
                //帅、将不能出宫（同仕一样），四个方向都能走单只限一格，如果落棋位置有子，则必须为对方的子
                if(code === 15 || code === 25){
                    if(x2 < 3 || x2 > 5 || y2 < 7)return false; //不能出宫
                    return (((abs(x1 - x2) === 1) && (y1 === y2)) || ((abs(y1 - y2) === 1) && (x1 === x2)))
                        || ((code === 15 && target > 20) && (((abs(x1 - x2) === 1) && (y1 === y2)) || ((abs(y1 - y2) === 1) && (x1 === x2))))
                        || ((code === 25 && target < 20) && (((abs(x1 - x2) === 1) && (y1 === y2)) || ((abs(y1 - y2) === 1) && (x1 === x2))));
                }
            }
            return false;
        },

        //将、帅是否碰面
        isFaceToFace: function(){

        },

        //是否将军
        isThreat: function(){

        }

    };

    //检测两个位置中间是否有棋子（查询map数组，包含落棋的位置是否有棋子存在）, 返回一个number数值
    //0表示无子，其他值表示中间有棋子的个数
    function hasChessInMiddle(points){
        var map = data.map;
        var x1 = points.x1;
        var y1 = points.y1;
        var x2 = points.x2;
        var y2 = points.y2;
        var i;
        var stack = 0;  //记录中间棋子个数
        if(x1 == x2){  //垂直行走
            /*if(y1 > y2){
                while(y1 !== y2){
                    y1--;
                    map[y1] && map[y1][x1] != 0 && stack++;
                }
            }
            if(y1 < y2){*/
                while(y1 !== y2){
                    y1 > y2 ? y1-- : y1++;
                    map[y1] && map[y1][x1] != 0 && stack++;
                }
            //}
        }else if(y1 == y2){  //水平行走
            /*if(x1 > x2){
                for(i = (x2 + 1); i < x1; i++)
                    map[y1][i] != 0 && stack++;
            }
            if(x1 < x2){
                for(i = (x1 + 1); i < x2; i++)
                    map[y1][i] != 0 && stack++;
            }*/
            while(x1 !== x2){
                x1 > x2 ? x1-- : x1++;
                map[y1][x1] != 0 && stack++;
            }
        }else{
            stack = 100;
        }
        return stack;
    }

});
