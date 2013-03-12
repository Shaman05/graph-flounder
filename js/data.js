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
            imagePath: '/images/',
            redPrefix: 'red_',
            blackPrefix: 'black_'
        },
        style: {
            bgColor: '#D1BF9A',
            stroke: {
                "stroke": "black",
                "stroke-width":.3,
                "fill": "none"
            },
            outLine: {
                "stroke-width": 1
            },
            limit: {
                "fill": "#d1bf9a"
            },
            text: {
                "stroke": "#333333",
                "stroke-width":.5,
                "font-size": 28,
                "font-family": "黑体",
                "fill": "#585040"
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
        user: {
            type: 'red'
        }
    };

});