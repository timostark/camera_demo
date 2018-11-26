module.exports = function (grunt) {
    'use strict';

    // get grunt options (console command parameters)
    var sUser = grunt.option('user');
    var sPwd = grunt.option('pwd');

    // load grunt plugins
    require('jit-grunt')(grunt, {
        openui5_preload: 'grunt-openui5',
        configureProxies: 'grunt-connect-proxy2',
        nwabap_ui5uploader: 'grunt-nwabap-ui5uploader'
    });
    grunt.loadNpmTasks("grunt-testcafe");

    // create config
    grunt.initConfig({
        settings: {
            connect: {
                host: 'localhost',
                port: 9856
            }
        },

        portPick: {
            options: {
                hostname: '<%= settings.connect.host %>',
                port: 9500
            },
            test: {
                targets: [
                    'settings.connect.port'
                ]
            }
        },

        eslint: {
            main: {
                src: [
                    'webapp/**/*.js',
                    '!webapp/libs/**',
                ]
            }
        },

        connect: {
            options: {
                open: true,
                protocol: 'https',
                hostname: '<%= settings.connect.host %>',
                port: '<%= settings.connect.port %>',
                middleware: function (connect, options, defaultMiddleware) {
                    var aMiddlewares = [];
                    aMiddlewares.push(require('grunt-connect-proxy2/lib/utils').proxyRequest);
                    aMiddlewares.push(defaultMiddleware);
                    return aMiddlewares;
                }
            },
            serverWebapp: {
                options: {
                    base: ['']
                },
            },
            serveWebappTest: {
                options: {
                    open: false,
                    protocol: "https",
                    base: ['']
                },
            },
            serveWebappOpen: {
                options: {
                    open: true,
                    base: ['']
                }
            },
            serverBuild: {
                options: {
                    base: ['build']
                },
            },
            
            proxies: [
            ]
        },

        xml_validator: {
            your_target: {
                src: ['webapp/**/*.xml']
            }
        },

        watch: {
            options: {
                livereload: false
            },
            mainWebapp: {
                files: ['webapp/**/*'],
                tasks: ['eslint']
            },
            liveReloadWebapp: {
                files: ['webapp2/**/*']
            },
            liveReloadBuild: {
                files: ['webapp/**/*'],
                tasks: ['eslint', 'doBuild']
            }
        },

        qunit_puppeteer: {
            test: {
                options: {
                    headless: false,
                    traceSettings: {
                        outputConsole: false,
                        outputAllAssertions: false,
                    },
                    viewport: {
                        width: 1920,
                        height: 1080
                    },
                    mobile: {
                        emulate: false,
                        landscape: true,
                        tablet: false
                    },
                    qunitPage: "https://localhost:9856/test/integration/opaTests.qunit.html"
                }
            }
        },
    });
    // register combined tasks
    grunt.registerTask('doWatch', ['watch:mainWebapp']);
    grunt.registerTask('doServeWebapp', ['configureProxies:server', 'connect:serveWebappOpen', 'watch:liveReloadWebapp']);
    grunt.registerTask('doServeOnBuild', ['configureProxies:server', 'connect:serveBuildOpen', 'watch:liveReloadBuild']);
    grunt.registerTask('doBuild', ['xml_validator', 'clean', 'copy', 'openui5_preload']);
    grunt.registerTask('doTest', ['configureProxies:server', 'portPick:test', 'connect:serveWebappTest', 'qunit_puppeteer:test']);
    grunt.registerTask('doE2E', ['configureProxies:server', 'portPick:test', 'connect:serveWebappTest', 'testcafe:test_integration']);

    // register default task
    grunt.registerTask('default', ['doBuild']);
}