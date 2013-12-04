
module.exports = function (grunt) {
    var environment = grunt.option('env') || 'dev';

    // Project configuration.
    grunt.initConfig({

        /* Watch source code */
        watch: {
            server: {
                files: 'srv/**/*.js',
                tasks: ['mochaTest:srv']
            },
            sass: {
                files: 'assets/sass/**/*.scss',
                tasks: ['sass']
            },
            browserify: {
                files: 'assets/js/**/*.js',
                tasks: ['browserify2']
            },
            uglify: {
                files: 'public/js/main.js',
                tasks: ['uglify:' + environment]
            },
            template: {
                files: 'assets/templates/**/*.jst',
                tasks: ['dot-packer:dev', 'browserify2']
            }
        },

        /* Client JS compilation */
        browserify2: {
            compile: {
                entry: './assets/js/main.js',
                compile: './public/js/main.js'
            }
        },

        uglify: {
            prod: {
                files: {
                    'public/js/main.min.js': 'public/js/main.js'
                }
            },
            dev: {
            }
        },

        /* Pre compile doT template */
        "dot-packer": {
            dev: {
                dest: 'assets/templates/',
                source: 'assets/templates/'
            }
        },

        /* Backend unit test*/
        mochaTest: {
            srv: {
                options: {
                    reporter: 'dot'
                },
                src: ['srv/tests/**/*.js']
            }
        },

        /* Sass compilation */
        sass: {
            prod: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/main.css': 'assets/sass/main.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded',
                    debug: true
                },
                files: {
                    'public/css/main.css': 'assets/sass/main.scss'
                }
            }
        },

        /* Launch node application */
        nodemon: {
            dev: {
                options: {
                    file: 'app/app.js',
                    cwd: 'srv',
                    env: {
                        PORT: '3000',
                        env: 'dev'
                    }
                }
            },
            prod: {
                options: {
                    file: 'app/app.js',
                    cwd: 'srv',
                    env: {
                        PORT: '3000',
                        env: 'prod'
                    }
                }
            }
        },

        /* Launch multiple task in parallel*/
        concurrent: {
            tasks: ['nodemon:'+environment, 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.registerTask('default', ['sass:' + environment, 'browserify2', 'uglify:'+environment, 'concurrent']);
    grunt.loadTasks('config');
    grunt.registerTask('dot', 'dot-packer:dev');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-browserify2');
};