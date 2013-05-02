#!/usr/bin/env node

/**
 * Metrics Watcher build script
 *
 * Usage:
 * ./build.js --help
 */
var FILE_ENCODING = "utf-8";
var _fs = require("fs");
var program = require("commander");

function uglify(srcPath, distPath) {
	var UglifyJS = require("uglify-js");
	var result = UglifyJS.minify(srcPath);

	_fs.writeFileSync(distPath, result.code, FILE_ENCODING);
	console.log(" Minified: " + distPath);
}

program
	.version("1.0")
	.option('-m, --minify', 'Minify the javascript')
	.parse(process.argv);

if (program.args.length == 0 || program.minify) {
	uglify("metrics-watcher.js", "metrics-watcher.min.js");
}
