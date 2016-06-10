(function () {
    'use strict';

    // -------------
    // ngtemplates
    // -------------

    module.exports = function (instance) {
        var options = instance.options();

        if (options.templates) {
            if (options.templates.options) {
                return options.templates;
            } else {
                options.templates.options = {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                };
            }
            return options.templates;
        }
    };
})();