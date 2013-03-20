/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-17
 * Time: 下午3:32
 * To change this template use File | Settings | File Templates.
 */

;(function(){

    'use strict';

    seajs.config({
        base: './js/module/',
        debug: true
    });

    seajs.use('board', function(board){

        board.init();

    });

})();
