/**
 * Created with JetBrains WebStorm.
 * User: Shaman
 * Date: 13-3-12
 * Time: 下午9:57
 * To change this template use File | Settings | File Templates.
 */

;(function(){

    seajs.config({
        debug: true
    });

    seajs.use('chessboard', function(c){
        c.init();
    });

})();