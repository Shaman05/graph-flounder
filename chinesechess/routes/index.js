
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
      title: 'Chinese Chess (nodejs + socket.io + express)'
  });
};