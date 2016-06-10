(function () {
    'use strict';

    // -------------------
    // less
    // -------------------

    module.exports = function (instance) {
        var path = require('path'), data = instance.data, options = instance.options();

        return data.less || {
                main: {
                    files: [{
                        src: [path.join(options.cwd, 'assets', 'less', '**/*.less')],
                        dest: path.join('.tmp', 'styles/less.css'),
                        filter: 'isFile'
                    }]
                }
            };
    };
})();
