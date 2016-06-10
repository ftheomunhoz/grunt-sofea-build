(function () {
    'use strict';

    // -------------
    // uglify
    // -------------

    module.exports = function (instance) {
        var data = instance.data,
            uglifyFlag = data.minify === true;

        return data.uglify || {
                options: {
                    mangle: uglifyFlag,
                    beautify: !uglifyFlag,
                    compress: uglifyFlag,
                    preserveComments: !uglifyFlag
                }
            };
    };
})();