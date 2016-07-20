(function () {
    'use strict';

    // -------------------
    // copy
    // -------------------

    module.exports = function (instance) {
        var path = require('path'),
            data = instance.data,
            options = instance.options(),
            fs = require('fs'),
            lodash = require('lodash');

        var copy = {
            json: {
                options: {
                    process: function (content, srcpath) {
                        if (srcpath.indexOf("pt-br") < 0 && srcpath.indexOf("es-es") < 0 && srcpath.indexOf("en-us") < 0 && srcpath.indexOf(".json") > 0) {
                            return JSON.parse(JSON.stringify(content).replace(/(\\r\\n)|( +)/g, ""));
                        }
                        return content;
                    }
                },
                files: [{
                    expand: true,
                    cwd: options.cwd,
                    src: [path.join('**/*.json'), path.join('!mocks', '**'), path.join('!bower_components', '**')],
                    dest: path.join(options.cwd, options.dest),
                    filter: 'isFile'
                }]
            },
            main: {
                files: [{
                    expand: true,
                    cwd: path.join(options.cwd, 'assets', 'images'),
                    src: ['**'],
                    dest: path.join(options.cwd, options.dest, 'assets', 'images')
                }, {
                    expand: true,
                    cwd: path.join(options.cwd, 'assets', 'videos'),
                    src: ['**'],
                    dest: path.join(options.cwd, options.dest, 'assets', 'videos')
                }, {
                    expand: true,
                    cwd: path.join(options.cwd, 'assets', 'fonts'),
                    src: ['**'],
                    dest: path.join(options.cwd, options.dest, 'assets', 'fonts')
                }, {
                    expand: true,
                    flatten: true,
                    src: [path.join(options.cwd, 'favicon.ico'), path.join(options.cwd, 'robots.txt'), path.join(options.cwd, 'humans.txt'), 'package.json'],
                    dest: path.join(options.cwd, options.dest),
                    filter: 'isFile'
                }]
            },
            config: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [path.join(options.cwd, 'config', (data.env ? '*.' + data.env + '.js' : '*.js*'))],
                    dest: path.join(options.cwd, options.dest, 'scripts', 'config'),
                    filter: 'isFile',
                    rename: function (dest, src) {
                        return path.join(dest, (data.env ? src.replace('.' + data.env, '') : src));
                    }
                }]
            },
            version: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [path.join(options.cwd, 'dependencies.js')],
                    dest: path.join(options.cwd, options.dest, 'scripts'),
                    filter: 'isFile'
                }],
                options: {
                    process: function (content) {
                        return "//" + new Date() + "\n" + content;
                    }
                }
            },
            index: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [path.join(options.cwd, 'index.html')],
                        dest: path.join(options.cwd, options.dest),
                        filter: 'isFile'
                    }
                ],
                options: {
                    process: function (content) {
                        var folderPath = path.join(options.cwd, options.dest, 'assets', 'styles');
                        var fileList = fs.readdirSync(folderPath);
                        var styleContent = [];
                        var inlineStyle = options.inlineStyle;

                        for (var i = 0, len = fileList.length; i < len; i++) {
                            if (fileList[i].indexOf("css") >= 0) {
                                var filePath = path.join(folderPath, fileList[i]);

                                styleContent.push({
                                    inline: (inlineStyle.indexOf(fileList[i]) >= 0),
                                    name: fileList[i],
                                    date: fs.statSync(filePath).ctime
                                });
                            }
                        }

                        styleContent = lodash.sortBy(styleContent, 'date');
                        var styleHtml = '';

                        for (var i = 0, len = styleContent.length; i < len; i++) {
                            if (styleContent[i].inline) {
                                styleHtml = styleHtml + '<style>' + fs.readFileSync(path.join(folderPath, styleContent[i].name)) + '</style>';
                                continue;
                            }

                            styleHtml = styleHtml + '<link rel="stylesheet" href="assets/styles/' + styleContent[i].name + '">';
                        }

                        return content
                            .replace(/(<script).*(<\/script>)/g, '')
                            .replace(/(<link).*(>)/g, '')
                            .replace('</head>', styleHtml + '</head>')
                            .replace(/(ng-app=)('|")(.*)('|")/g, '')
                            .concat('<script data-main="scripts/dependencies.js">' + fs.readFileSync(path.join(options.cwd, options.dest, 'scripts', 'require.js')) + '</script>');
                    }
                }
            }
        };

        if (data.copy) {
            for (var key in data.copy) {
                if (!copy.hasOwnProperty(key)) {
                    copy[key] = data.copy[key];
                }
                else {
                    copy
                }
            }
        }

        return copy;
    };
})();
