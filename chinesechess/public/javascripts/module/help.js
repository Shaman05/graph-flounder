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
        }

    };


});