/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午10:15
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    var data = require('./data');
    var baseSize = data.pieces.size;
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

    //创建画布
    var canvas = Raphael('chessBoard', u10, u11);

    module.exports = {

        init: function(){
            drawBoard(baseSize);
        },

        createChess: function(camp, chess){
            var map = this.boardArr;
            var offsetX = baseSize/2 + 10;
            var offsetY = baseSize/2 + 10;
            if(camp === 'black'){
                map.reverse();
            }
            for(var y = 0, len = map.length; y < len; y++){
                var arr = map[y];
                for(var x = 0, _len = arr.length; x < _len; x++){
                    if(arr[x]){
                        var fields = arr[x].split('_');
                        new chess(fields[0], fields[1], offsetX + baseSize * x, offsetY + baseSize * y, chessSize, chessSize);
                    }
                }
            }
        },

        canvas: canvas,

        boardArr: [
            ["black_che" , "black_ma"  , "black_xiang" , "black_shi" , "black_jiang" , "black_shi" , "black_xiang" , "black_ma"  , "black_che"],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            [null        , "black_pao" , null          , null        , null          , null        , null          , "black_pao" , null       ],
            ["black_zu"  , null        , "black_zu"    , null        , "black_zu"    , null        , "black_zu"    , null        , "black_zu" ],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            ["red_bing"  , null        , "red_bing"    , null        , "red_bing"    , null        , "red_bing"    , null        , "red_bing" ],
            [null        , "red_pao"   , null          , null        , null          , null        , null          , "red_pao"   , null       ],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            ["red_che"   , "red_ma"    , "red_xiang"   , "red_shi"   , "red_shuai"   , "red_shi"   , "red_xiang"   , "red_ma"    , "red_che"  ]
        ]

    };

    function drawBoard(u1){
        var box = document.getElementById('chessBoard');
        box.style.height = u11 + 'px';
        box.style.width = u14 + 'px';
        box.style.backgroundColor = data.style.bgColor;
        box.style.top = '50%';
        box.style.left = '50%';
        box.style.marginTop = - u11/2 + 'px';
        box.style.marginLeft = - u14/2 + 'px';
        var dx = u1 + 5;
        var dy = u1 + 5;
        var style = data.style;
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

});