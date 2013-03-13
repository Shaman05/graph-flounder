/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:40
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    module.exports = {

        pieces: {
            size: 50,
            imagePath: './image/'
        },

        style: {
            bgColor: '#D1BF9A',
            stroke: {
                "stroke": "black",
                "stroke-width": .3
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
            },
            rectUnit: {
                "fill" : "#d1bf9a",
                "fill-opacity" : 0,
                "cursor" : "pointer",
                "stroke" : "green",
                "stroke-width" : .5
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

        //默认执手红棋
        player: {
            type: 'red',
            canMove: true
        },

        //棋子初始位置，如果是残局演练，则需将此字段重新赋值为残局棋谱
        boardMap: [
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

});