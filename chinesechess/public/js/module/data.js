/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:40
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    'use strict';

    var canvas = require('./paper');

    module.exports = {

        rectUnit: function(){
            return canvas.rect(10, 10, 40, 40)
                .toFront()
                .hide()
                .attr({
                    "fill" : "#d1bf9a",
                    "fill-opacity" : 0,
                    "cursor" : "pointer",
                    "stroke" : "green",
                    "stroke-width" : .5
                });
        }(),

        pieces: {
            size: 50,
            imagePath: './images/'
        },

        style: {
            bgColor: '#D1BF9A',
            stroke: {
                "stroke": "black",
                "stroke-width":.5
            },
            outLine: {
                "stroke-width": 1
            },
            shortLine: {
                "stroke-width": .8
            },
            limit: {
                "fill": "#d1bf9a"
            },
            text: {
                "stroke": "#333333",
                "stroke-width": .5,
                "font-size": 28,
                "font-family": "宋体",
                "fill": "#585040"
            },
            number: {
                "font-size": 14,
                "font-family": "宋体"
            },
            vRectUnit: {
                "fill": "#d1bf9a",
                "fill-opacity": 0,
                "cursor": "pointer",
                "stroke": "green",
                "stroke-width": .5,
                "stroke-dasharray": "--",
                "stroke-opacity": 0
            }
        },

        text: {
            CH: "楚 河",
            HJ: "汉 界",
            Num: [
                ["1","2","3","4","5","6","7","8","9"],
                ["九","八","七","六","五","四","三","二","一"]
            ]
        },

        //系统分配给用户身份
        player: {
            type: 'red'
        },

        selectedObj: null,

        //currentPlay为当前是否能走棋的标志
        //服务端每收到一次走棋信息则该值变更为: 1 - currentPlay
        //如果player.type为 red , 则该值默认为1
        //如果player.type为 black,则该值默认为0
        currentPlayer: 1,

        //棋子初始位置，如果是残局演练，则需将此字段重新赋值为残局棋谱
        map: [
            [21, 22, 23, 24, 25 ,24, 23, 22, 21],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
            [ 0, 26,  0,  0,  0,  0,  0, 26,  0],
            [27,  0, 27,  0, 27,  0, 27,  0, 27],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
            [17,  0, 17,  0, 17,  0, 17,  0, 17],
            [ 0, 16,  0,  0,  0,  0,  0, 16,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
            [11, 12, 13, 14, 15 ,14, 13, 12, 11]
        ],

        chess: {
            //红棋
            11: {en: 'che',   cn: '车'},
            12: {en: 'ma',    cn: '马'},
            13: {en: 'xiang', cn: '相'},
            14: {en: 'shi',   cn: '仕'},
            15: {en: 'jiang', cn: '帅'},
            16: {en: 'pao',   cn: '炮'},
            17: {en: 'bing',  cn: '兵'},
            //黑棋
            21: {en: 'che',   cn: '车'},
            22: {en: 'ma',    cn: '马'},
            23: {en: 'xiang', cn: '象'},
            24: {en: 'shi',   cn: '士'},
            25: {en: 'jiang', cn: '将'},
            26: {en: 'pao',   cn: '跑'},
            27: {en: 'bing',  cn: '卒'}
        },

        //记录列表，只保存当前正在进行的棋局
        recode: []
    };

});