/**
 * This file is the application's main JavaScript file. It is listed as a dependency in run.js and will automatically
 * load when run.js loads.
 *
 * Because this file has the special filename `main.js`, and because we've registered the `app` package in run.js,
 * whatever object this module returns can be loaded by other files simply by requiring `app` (instead of `app/main`).
 *
 * Our first dependency is to the `dojo/has` module, which allows us to conditionally execute code based on
 * configuration settings or environmental information. Unlike a normal conditional, these branches can be compiled
 * away by the build system; see `staticHasFeatures` in app.profile.js for more information.
 *
 * Our second dependency is to the special module `require`; this allows us to make additional require calls using
 * module IDs relative to this module within the body of the define callback.
 *
 * In all cases, whatever function is passed to define() is only invoked once, and the returned value is cached.
 *
 * More information about everything described about the loader throughout this file can be found at
 * <http://dojotoolkit.org/reference-guide/loader/amd.html>.
 */
define([ 'dojo/has', 'require' ], function (has, require) {
	var app = null;

	console.log('Hello from the server!');
	
	require(["dojo/node!express/index", "dojo/node!express-load/index", "dojo/node!mongoose/index", "dojo/node!http", "dojo/node!path"], function(express, load, mongoose, http, path) {
		console.log("Loading complete...");
		app = express();
		db = mongoose.createConnection("127.0.0.1", "nanna-tv");
		
		app.configure(function(){
		    app.set('title', 'Nanna-TV');
	        app.set('port', process.env.PORT || 3000);
	        app.set('db', db);
	        app.set('mongoose', mongoose);
	        app.use(express.favicon());
	        app.use(express.bodyParser());
	        app.use(express.methodOverride());
	        app.use(express.cookieParser('your secret here'));
	        app.use(express.session());
	        app.use(app.router);
	        app.use("/public", express.static(path.join('public')));
        });
        
        app.configure('development', function(){
            app.use(express.logger('dev'));
	        app.use(express.errorHandler());
		});
		
		load('models')
		  .then('controllers')
		  .then('routes')
		  .into(app);
		  
		app.listen(app.get('port'));

		/**
		 *  Display some stuff from the auto-loaded config.
		 */
		
		console.log('%s running in %s mode on port %s' 
		  , app.get('title')
		  , app.get('env')
		  , app.get('port')
		);
	});
});