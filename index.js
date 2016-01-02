'use strict';

var through = require('through2');
var replaceExt = require('replace-ext');
var reactJade = require('react-jade');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-rj';

function gulpRJ(options) {
	return through.obj(function(file, enc, callback) {
		if (file.isNull()) {
			this.push(file);
			return callback();
		}
		if (file.isBuffer()) {
			var templateString = reactJade.compileClient(
				file.contents.toString(),
				{globalReact: true}
			).toString();
			file.contents = new Buffer(
				'var React = require("react"); module.exports = ' + templateString + ';'
			);
			file.path = replaceExt(file.path, '.js');
			this.push(file);
			return callback();
		}
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		return callback();
	});
}

module.exports = gulpRJ;
