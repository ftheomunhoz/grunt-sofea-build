(function () {
    'use strict';

    // -------------
    // string-replace
    // -------------

    module.exports = function (instance) {
        var path = require('path'), fs = require('fs'), data = instance.data, options = instance.options();

        return data['string-replace'] || {
                dist: {
                    files: [{
                        expand: true,
                        flatten: true,
                        src: [path.join(options.cwd, options.dest, 'scripts', 'dependencies.js')],
                        dest: path.join(options.cwd, options.dest, 'scripts'),
                        filter: 'isFile'
                    }],
                    options: {
                        replacements: [{
                            pattern: /('|")(.*)('|")/ig,
                            replacement: function (match, p1, p2) {
                                var list = fs.readdirSync(path.join(options.cwd, options.dest, 'scripts'));

                                var searchingFor = match.substring(1, match.length - 1);

                                for (var i = 0, len = list.length; i < len; i++) {
                                    var name = list[i].substring(0, list[i].lastIndexOf('.'));

                                    if (name.substring(name.indexOf(searchingFor)) === searchingFor) {
                                        return '\'' + name + '\'';
                                    }
                                }

                                return match;
                            }
                        }]
                    }
                }
            };
    };
})();