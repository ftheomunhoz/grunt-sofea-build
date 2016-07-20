(function() {
	'use strict';

	module.exports = function(grunt, instance) {
		var path = require('path');

		instance.options({
			"cwd" : "app",
			"dest" : "deploy",
			"src" : "",
			"templates": {}
		});

		return {
			loadLocalNpmTask : function(dependency) {
				grunt.loadNpmTasks(dependency);

				var argsLen = arguments.length;
				if (argsLen > 1) {
					for (var i = 1; i < argsLen; i++) {
						var config = arguments[i];
						grunt.config.data[config] = require(
								path.join('../config', config))(instance);
					}
				}
			}
		};
	};
})();