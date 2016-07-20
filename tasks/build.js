'use strict';

module.exports = function (grunt) {
    var build = function () {
        var utils = require('./lib/utils/utils')(grunt, this);

        require('time-grunt')(grunt);

        utils.loadLocalNpmTask('grunt-contrib-clean', 'clean');
        utils.loadLocalNpmTask('grunt-contrib-uglify', 'uglify');
        utils.loadLocalNpmTask('grunt-usemin', 'useminPrepare', 'usemin');
        utils.loadLocalNpmTask('grunt-angular-templates', 'ngtemplates');
        utils.loadLocalNpmTask('grunt-contrib-htmlmin', 'htmlmin');
        utils.loadLocalNpmTask('grunt-string-replace', 'string-replace');
        utils.loadLocalNpmTask('grunt-contrib-less', 'less');
        utils.loadLocalNpmTask('grunt-contrib-cssmin', 'cssmin');
        utils.loadLocalNpmTask('grunt-ng-annotate', 'ngAnnotate');
        utils.loadLocalNpmTask('grunt-rev', 'rev');
        utils.loadLocalNpmTask('grunt-contrib-copy', 'copy');

        utils.loadLocalNpmTask('grunt-contrib-concat');

        var tasks = [
            'clean:temp',
            'clean:dest',
            'ngtemplates',
            'useminPrepare',
            'htmlmin:main',
            'usemin',
            'less',
            'cssmin',
            'copy:json',
            'copy:main',
            'copy:config',
            'concat:generated',
            'ngAnnotate',
            'uglify:generated',
            'rev',
            'copy:version',
            'string-replace',
            'copy:index',
            'htmlmin:index',
            'clean:temp'];

        var runTasks = [];

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i] === "ngtemplates" && !grunt.config.data["build"][this.target].options.templates) {
                continue;
            }
            if ((tasks[i] === "uglify:generated" || tasks[i] === "ngAnnotate") && !grunt.config.data["build"][this.target].minify) {
                continue;
            }
            runTasks.push(tasks[i]);
        }

        var copyObj = grunt.config.data["build"][this.target].copy;
        if (copyObj !== undefined) {
            for (var copyTarget in copyObj) {
                runTasks.push("copy:" + copyTarget);
            }
        }

        grunt.task.run(runTasks);
    };

    grunt.registerMultiTask('build', 'Build AngularJS project', build);
};
