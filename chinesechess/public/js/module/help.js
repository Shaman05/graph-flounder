/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-16
 * Time: 下午6:12
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    'use strict';

    var data = require('./data');

    var $msgBox = $('#chatBox');
    var $gameTypeSelect = $('#gameType');
    var $radios = $('#viewer,#red,#black');
    var $recode = $('#recode');
    var $realMap = $('#realMap');
    var baseSize = 50;
    var offsetX = baseSize/2 + 10;
    var offsetY = baseSize/2 + 10;

    module.exports = {

        resetRadio: function(){
            $gameTypeSelect.attr('selectedIndex', 0);
            $radios.attr('disabled', false);
            $('#viewer').attr('checked', true);
        },

        disableRadio: function(){
            $radios.attr('disabled', true);
        },

        msg: function(text, name, type){
            if(typeof text !== 'string')return;
            if(name === 'sys'){
                $msgBox.prepend('<p class="' + type + '">【系统】' + text + '</p>');
            }else{
                $msgBox.prepend('<p class="user">【' + name + '】' + text + '</p>');
            }
            $msgBox.scrollTop(0);
        },

        showHelp: function(){
            var helpStr = '<div class="help">' +
                              '<p> -help 查看帮助</p>' +
                              '<p> -clear 清除消息框内容</p>' +
                              '<p> -rename yourname 重新起名（只能是8位以内的数字和字母组合）</p>' +
                          '</div>';
            $msgBox.prepend('<p class="tip">【系统】目前已有的命令：' + helpStr + '</p>');
        },

        clear: function(){
            $msgBox.empty();
        },

        writeStep: function(camp, name, p1, p2){
            var campMap = {
                'red': '红方',
                'black': '黑方'
            };
            var stepStr = this.transformNum(camp, name, p1, p2);
            $('<option class="' + camp + '">[' + campMap[camp] + ']:' + stepStr + '</option>').prependTo($recode);
        },

        transformNum: function(camp, name, p1, p2){
            var realName = '';
            var start = '';
            var direction = '';
            var end = '';
            var map = {
                'red': {
                    name: {
                        'shuai': '帅',
                        'shi': '仕',
                        'xiang': '相',
                        'ma': '马',
                        'che': '车',
                        'pao': '炮',
                        'bing': '兵'
                    },
                    num: ["九","八","七","六","五","四","三","二","一"]
                },
                'black': {
                    name: {
                        'jiang': '将',
                        'shi': '士',
                        'xiang': '象',
                        'ma': '马',
                        'che': '车',
                        'pao': '跑',
                        'zu': '卒'
                    },
                    num: ['1','2','3','4','5','6','7','8','9']
                }
            };

            realName = map[camp].name[name];
            start = map[camp].num[p1.x];
            end = map[camp].num[p2.x];
            var r = map[camp].num;
            (camp == 'red') && r.reverse();
            if(p1.y === p2.y)
                direction = '平';
            if(p1.y < p2.y){
                direction = '退';
                if(p1.x === p2.x)
                    end = r[p2.y - p1.y - 1];
            }
            if(p1.y > p2.y){
                direction = '进';
                if(p1.x === p2.x)
                    end = r[p1.y - p2.y - 1];
            }


            return realName + start + direction + end;
        },

        updateMap: function(points){
            data.map[points.y1][points.x1] = 0;
            data.map[points.y2][points.x2] = data.selectedObj.data('code');
        },

        printMap: function(obj){
            var map = data.map;
            var buffer = [];
            buffer.push('<table>');
            for(var i = 0, len = map.length; i < len; i++){
                buffer.push('<tr>');
                var row = map[i];
                for(var j = 0, _len = row.length; j < _len; j++){
                    buffer.push('<td>');
                    buffer.push(row[j]);
                    buffer.push('</td>');
                }
                buffer.push('</tr>');
            }
            $realMap.html(buffer.join(''));
            this.highLightCell(obj);
        },

        highLightCell: function(obj){
            var point = this.transformPoint(obj);
            $realMap.find('.current').removeClass('current');
            $realMap.find('tr:eq(' + point.y1 + ')').find('td:eq(' + point.x1 + ')').addClass('current');
        },

        transformPoint: function(p1, p2){
            return {
                x1: p1 && Math.floor((p1.attr('x') - offsetX)/baseSize),
                y1: p1 && Math.floor((p1.attr('y') - offsetY)/baseSize),
                x2: p2 && Math.floor((p2.attr('x') - offsetX)/baseSize),
                y2: p2 && Math.floor((p2.attr('y') - offsetY)/baseSize)
            };
        }

    };


});