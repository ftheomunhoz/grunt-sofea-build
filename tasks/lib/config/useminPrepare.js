(function () {
    'use strict';

    // -------------
    // useminPrepare
    // -------------

    module.exports = function (instance) {
        var path = require('path'),
            data = instance.data,
            options = instance.options(),
            jsTasks = ['concat'];

        if (data.minify === true) {
            jsTasks.push('uglifyjs');
        }

        return data.useminPrepare || {
                html: path.join(options.cwd, options.src, 'index.html'),
                options: {
                    dest: path.join(options.cwd, options.dest),
                    flow: {
                        html: {
                            steps: {
                                js: jsTasks,
                                css: ['cssmin']
                            },
                            post: {}
                        }
                    }
                }
            };
    };
})();