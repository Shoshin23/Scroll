
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path')
  , twitter = require('ntwitter')
  , io = require('socket.io')
  , date = require('./date');

var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

console.log(Date.today().add(5).days());
// Twitter Authenticate
var twit = new twitter({
  consumer_key: 'AlG8jdQx6kt2pDcyWFabKQ',
  consumer_secret: 'itHppq8OXTKglQXYXCFw1PPluJqmL6KKFITwLWVh4',
  access_token_key: '13340162-mhlZTXjqSpqFFnuE6vS4O4P4WVw7o5T5pYCWlceKW',
  access_token_secret: 'HAa34YHzrd8reun6Kwh5Xjy2LdjkCvkaSlzTLdegM'
});

twit.stream('user', { track:"meTheKarthik" }, function(stream) {
  stream.on('data', function (data) {
	 while(data.created_at <= (7).days().ago()) { 
    io.sockets.volatile.emit('tweet', {
      user: data.screen_name,
      text: data.text,
      created_at: data.created_at
    });
	 }
	 stream.on('end', function(data) {
		 console.log("end of streaming");
	 });

	 stream.on('destroy',function(data) {
		 console.log("destroyed stream");
	 });
	 setTimeout(stream.destroy,500000);

    //console.log(data);
   
  });
});


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
