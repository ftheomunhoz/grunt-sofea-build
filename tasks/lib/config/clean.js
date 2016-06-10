(function () {
    'use strict';

    // -------------------
    // clean
    // -------------------

    module.exports = function (instance) {
        var path = require('path'),
            data = instance.data,
            options = instance.options();

        return data.clean || {
                temp: {
                    src: ['.tmp']
                },
                dest: {
                    src: [path.join(options.cwd, options.dest)]
                }
            };
    };
})();