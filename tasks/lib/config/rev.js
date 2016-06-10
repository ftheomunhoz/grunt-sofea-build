(function () {
    'use strict';

    // -------------------
    // rev
    // -------------------

    module.exports = function (instance) {
        var path = require('path'),
            data = instance.data,
            options = instance.options();

        return data.rev
            || {
                options: {
                    algorithm: 'md5',
                    length: 12
                },
                files: {
                    src: [
                        path.join(options.cwd, options.dest, 'scripts', '*.js'),
                        '!' + path.join(options.cwd, options.dest, 'scripts', '{dependencies,require}.js')]
                }
            };
    };
})();