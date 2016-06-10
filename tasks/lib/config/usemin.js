(function () {
    'use strict';

    // -------------
    // usemin
    // -------------

    module.exports = function (instance) {
        var path = require('path'),
            data = instance.data,
            options = instance.options();

        return data.usemin || {
                html: [path.join(options.cwd, options.dest, '{,*/}*.html')]
            };
    };
})();