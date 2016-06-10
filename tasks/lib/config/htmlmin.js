(function () {
    'use strict';

    // -------------------
    // htmlmin
    // -------------------

    module.exports = function (instance) {
        var path = require('path'),
            data = instance.data,
            options = instance.options();

        var htmlminOpts = {
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: false,
            removeRedundantAttributes: false,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true,
            keepClosingSlash: true
        };

        var htmlmin = {
            main: {
                options: htmlminOpts,
                files: [{
                    expand: true,
                    cwd: options.cwd,
                    src: ['**/*.html', '!bower_components/**/*.html', '!index.html', '!**/directives/**/*.html', '!**/components/**/*.html'],
                    dest: path.join(options.cwd, options.dest)
                }]
            },
            index: {
                options: htmlminOpts,
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: options.cwd,
                    src: [path.join(options.dest, 'index.html')],
                    dest: path.join(options.cwd, options.dest)
                }]
            }
        };

        if (data.htmlmin) {
            for (var key in data.htmlmin) {
                if (!htmlmin.hasOwnProperty(key)) {
                    htmlmin[key] = data.htmlmin[key];
                    htmlmin[key].options = htmlminOpts;
                }
            }
        }

        return htmlmin;
    };
})();
