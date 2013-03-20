/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-17
 * Time: 下午3:35
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    'use strict';

    var data = require('./data');
    var help = require('./help');
    var event = require('./event');
    var canvas = require('./paper');
    var socket = require('./socket');

    var map = data.map;
    var chess = data.chess;
    var camp = data.player.type;
    var baseSize = 50;
    var chessSize = baseSize - 10;
    var u2 = baseSize * 2;
    var u3 = baseSize * 3;
    var u4 = baseSize * 4;
    var u5 = baseSize * 5;
    var u6 = baseSize * 6;
    var u7 = baseSize * 7;
    var u8 = baseSize * 8;
    var u9 = baseSize * 9;
    var u10 = baseSize * 10;
    var u11 = baseSize * 11;
    var u14 = baseSize * 14;
    var u17 = baseSize * 17;
    var offsetX = baseSize/2 + 10;
    var offsetY = baseSize/2 + 10;
    var style = data.style;

    module.exports = {

        init: function(){
            drawBoard(baseSize);
            event.panelEvent();
            //todo : 由系统返回用户身份
            //如果当前玩家是黑色则翻转棋盘
            if(camp === 'black'){
                map.reverse();
            }
            drawNumber();
            createChessNode();
            help.printMap();
            socket.init();
        }

    };

    function drawBoard(u1){
        $('#chessBoard').css({
            height: u11 + 'px',
            width: u17 + 'px',
            backgroundColor: data.style.bgColor,
            top: '50%',
            left: '50%',
            marginTop: - u11/2 + 'px',
            marginLeft: - u14/2 + 'px'
        });
        var dx = u1 + 5;
        var dy = u1 + 5;
        var strokeStyle = style.stroke;
        var text = data.text;

        //绘制外边框
        canvas.rect(u1, u1, u8 + 10, u9 + 10).attr(strokeStyle).attr(style.outLine);

        //绘制内边框
        canvas.rect(dx, dy, u8, u9).attr(strokeStyle);

        //绘制格子
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 8; j++){
                canvas.rect(dx + u1 * j, dy + u1 * i, u1, u1).attr(strokeStyle);
            }
        }

        //绘制楚河、汉界
        canvas.rect(dx, dy + u4, u8, u1).attr(strokeStyle).attr(style.limit);
        canvas.text(dx + u2, dy + u4 + u1/2, text.CH).attr(style.text);
        canvas.text(u7, dy + u4 + u1/2, text.HJ).attr(style.text).transform('r180');

        //绘制断线
        var startX = u2 - 3;
        var startY = u3 + 2;
        var line1 = canvas.path('M' + startX + ',' + startY + 'H' + (startX + 5) + 'V' + (startY - 5));
        var line2 = canvas.path('M' + (startX + 16) + ',' + startY + 'H' + (startX + 11) + 'V' + (startY - 5));
        var line3 = canvas.path('M' + startX + ',' + (startY + 6) + 'H' + (startX + 5) + 'V' + (startY + 11));
        var line4 = canvas.path('M' + (startX + 16) + ',' + (startY + 6) + 'H' + (startX + 11) + 'V' + (startY + 11));
        //炮、跑位置
        var groupA = canvas.set().push(line1,line2,line3,line4).attr(style.shortLine); //炮位置
        groupA.clone().transform('t' + u6 + ',0');
        groupA.clone().transform('t0,' + u5);
        groupA.clone().transform('t' + u6 + ',' + u5);
        //兵、卒位置
        groupA.clone().transform('t' + u1 + ',' + u1);
        groupA.clone().transform('t' + u3 + ',' + u1);
        groupA.clone().transform('t' + u5 + ',' + u1);
        groupA.clone().transform('t' + u1 + ',' + u4);
        groupA.clone().transform('t' + u3 + ',' + u4);
        groupA.clone().transform('t' + u5 + ',' + u4);
        //边兵、边卒位置
        var groupB = canvas.set().push(line1,line3);
        groupB.clone().transform('t' + u7 + ',' + u1);
        groupB.clone().transform('t' + u7 + ',' + u4);
        var groupC = canvas.set().push(line2,line4);
        groupC.clone().transform('t-' + u1 + ',' + u1);
        groupC.clone().transform('t-' + u1 + ',' + u4);

        //绘制九宫斜线
        var X1 = u4 + 5;
        var Y1 = u1 + 5;
        var X2 = u6 + 5;
        var Y2 = u3 + 5;
        var la1 = canvas.path('M' + X1 + ',' + Y1 + ',L' + X2 + ',' + Y2);
        var la2 = canvas.path('M' + X1 + ',' + Y2 + ',L' + X2 + ',' + Y1);
        canvas.set().push(la1,la2).attr(strokeStyle).clone().transform('t0,' + u7);
    }

    function createChessNode(){
        for(var i = 0, len = map.length; i < len; i++){
            for(var j = 0, _len = map[i].length; j < _len; j++){
                var vRect, cNode;
                vRect = canvas.rect(offsetX + baseSize * j, offsetY + baseSize * i, chessSize, chessSize)
                                .attr(style.vRectUnit)
                                .data('posit',{x:j, y:i});
                vRect.click(event.vRectClick);
                //vRect.hover(event.vRectMouseOn, event.vRectMouseOut);
                var item = map[i][j];
                if(item){
                    var en = chess[item].en;
                    var imgUrl = '';
                    //红棋
                    if(item < 20){
                        imgUrl = './image/red_' + en + '.png';
                    }
                    //黑棋
                    if(item > 20){
                        imgUrl = './image/black_' + en + '.png';
                    }
                    cNode = canvas.image(imgUrl, offsetX + baseSize * j, offsetY + baseSize * i, chessSize, chessSize)
                                    .attr('cursor','pointer')
                                    .toFront()
                                    .data('code',item);
                    cNode.click(event.chessClick);
                    //cNode.hover(event.chessMouseOn, event.chessMouseOut);
                    //对手棋子需翻转
                    i < 5 && cNode.transform('r180');
                }
            }
        }
    }

    function drawNumber(){
        var numArr = data.text.Num;
        var topNum, bottomNum;
        var numberStyle = data.style.number;
        if(camp == 'red'){
            topNum = numArr[0];
            bottomNum = numArr[1];
        }else{ //黑方数字反转
            topNum = numArr[1].reverse();
            bottomNum = numArr[0].reverse();
        }
        //顶部数字，并且须翻转
        for(var i = 0; i < topNum.length; i++){
            canvas.text(baseSize * (i + 1) + 5, baseSize - 25, topNum[i]).attr(numberStyle).transform('r180');
        }
        //底部数字，从右向左
        for(var j = 0; j < bottomNum.length ; j++){
            canvas.text(baseSize * (j + 1) + 5, u11 - 15, bottomNum[j]).attr(numberStyle);
        }
    }

});
