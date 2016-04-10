"use strict";

var through = require('through2'),
	gutil = require('gulp-util'),
	Tcore = require('./lib/core');
	
var PLUGIN_NAME = 'tmaker';

var Tmaker = function(options) {
	
	var that;	
	Tcore.initTmakerOptions(options);
	
	var htmlBulider = function(file, enc, cb) {
		
		that = this;
		
		if (file.isNull()) {
			return cb(null, file);
		}
		
		if (file.isStream()) {
			return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
		}
		
		try{
			that.push(Tcore.compile(file));
		}
		catch(error){
			console.log(error.stack);
		}
		
		return cb();
	}
	
	var fulsh = function(cb){
		cb();
	}
	
	return through.obj(htmlBulider,fulsh);
}

module.exports = Tmaker;
