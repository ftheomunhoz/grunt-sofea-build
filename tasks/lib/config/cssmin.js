(function () {
    'use strict';

    // -------------------
    // cssmin
    // -------------------

    module.exports = function (instance) {
        var path = require('path'),
            data = instance.data,
            options = instance.options();

        return data.cssmin || {
                options: {
                    keepSpecialComments: 1,
                    report: 'gzip',
                    aggressiveMerging: true,
                    processImport: false
                },
                target: {
                    files: [
                        {
                            src: [path.join(options.cwd, 'assets', 'styles', '**/*.css')],
                            dest: path.join(options.cwd, options.dest, 'assets', 'styles/app.css')
                        }, {
                            src: [path.join('.tmp', 'styles/less.css')],
                            dest: path.join(options.cwd, options.dest, 'assets', 'styles/layout.css')
                        }
                    ]
                }
            };
    };
})();
