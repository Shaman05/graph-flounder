/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-17
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    'use strict';

    var data = require('./data');
    var help = require('./help');
    var v = require('./validation');
    var socket = require('./socket');

    var rectUnit = data.rectUnit;
    var $panel = $('#panel');

    module.exports = {

        common: function(){

        },

        vRectClick: function(){
            if(data.selectedObj){
                var _self = this;
                var toPoint = {x:this.attr('x'),y:this.attr('y')};
                var points = help.transformPoint(data.selectedObj, this);
                if(v.canMoveTo(data.selectedObj, this)){
                    data.selectedObj.toFront().animate(toPoint,300,function(){
                        //todo : 1.更新数组
                        help.updateMap(points);
                        help.printMap(_self);
                        //todo : 2.发送socket信息
                        //swap();
                        reset();
                        _self.attr('stroke-opacity',0);
                    });
                }
            }
        },

        /*vRectMouseOn: function(){
            if(data.selectedObj && v.canMoveTo(data.selectedObj, this)){
                this.attr('stroke-opacity',1);
            }
        },

        vRectMouseOut: function(){
            this.attr('stroke-opacity',0);
        },*/

        chessClick: function(){
            var _self = this;
            var currentCode = this.data('code');
            if(data.currentPlayer){ //如果当前轮到棋手走
                var toPoint = {x:this.attr('x'),y:this.attr('y')};
                //选棋的情况
                if((data.player.type == 'red' && currentCode < 20) || (data.player.type == 'black' && currentCode > 20)){
                    help.highLightCell(this);
                    if(data.selectedObj && data.selectedObj === this){
                        //todo : ???
                        //data.selectedObj = null;
                        //rectUnit.hide();
                    }else{
                        data.selectedObj = this;
                        rectUnit.attr(toPoint).show();
                    }
                }
                //吃子的情况
                if(data.selectedObj){
                    var selectCode = data.selectedObj.data('code');
                    if((selectCode < 20 && currentCode > 20) || (selectCode > 20 && currentCode < 20)){
                        if(v.canMoveTo(data.selectedObj, this)){
                            var points = help.transformPoint(data.selectedObj, this);
                            data.selectedObj.toFront().animate(toPoint,300,function(){
                                //todo : 1.更新数组
                                help.updateMap(points);
                                help.printMap(_self);
                                //todo : 2.发送socket信息
                                //swap();
                                reset();
                                _self.unclick().remove();
                            });
                        }
                    }
                }
            }else{
                help.msg('轮到对方走棋！', 'sys', 'error');
            }
        },

        /*chessMouseOn: function(){
            var selectedObj = data.selectedObj;
            var currentCode = this.data('code');
            if(selectedObj && v.canMoveTo(data.selectedObj, this)){
                var selectCode = selectedObj.data('code');
                if((selectCode < 20 && currentCode > 20) || (selectCode > 20 && currentCode < 20)){
                    this.animate({'opacity':.6},300);
                }
            }
        },

        chessMouseOut: function(){
            this.animate({'opacity':1},300);
        },*/

        panelEvent: function(){

        }

    };

    function reset(){
        data.selectedObj = null;
        rectUnit.toFront().hide();
    }

    function swap(){
        data.player.type = data.player.type == 'red' ? 'black' : 'red';
        // data.currentPlayer = 1 - data.currentPlayer;
    }

});