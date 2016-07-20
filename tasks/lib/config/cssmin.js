(function () {
    'use strict';

    // -------------------
    // cssmin
    // -------------------

    module.exports = function (instance) {
        var data = instance.data;

        return data.cssmin || {
                options: {
                    keepSpecialComments: 1,
                    report: 'gzip',
                    aggressiveMerging: true,
                    processImport: true
                }
            };
    };
})();
