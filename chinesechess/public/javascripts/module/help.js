/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-16
 * Time: 下午6:12
 * To change this template use File | Settings | File Templates.
 */

;define(function(require, exports, module){

    var $msgBox = $('#chatBox');
    var $gameTypeSelect = $('#gameType');
    var $radios = $('#viewer,#red,#black');
    var $recode = $('#recode');

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
            console.log(p1, p2);
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
            var r = map.red.num.reverse();
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
        }

    };


});