(function () {
    'use strict';

    // -------------------
    // ngAnnotate
    // -------------------

    module.exports = function (instance) {
        var path = require('path'), data = instance.data;

        return data.ngAnnotate || {
                options: {
                    add: true,
                    singleQuotes: true
                },
                main: {
                    files: [{
                        expand: true,
                        src: [path.join('.tmp', 'concat', '**', '*.js')],
                        ext: '.js',
                        extDot: 'last'
                    }]
                }
            };
    };
})();