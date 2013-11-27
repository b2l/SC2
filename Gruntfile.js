module.exports = function (grunt) {
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
            }
        },

        /* Client JS compilation */
        browserify2: {
            compile: {
                entry: './assets/js/main.js',
                compile: './public/js/main.js'
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
            dist: {
                options: {
                    style: 'expanded',
                    debug: 'true'
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
                    file: 'srv/app/app.js',
                    watchedExtensions: ['.js'],
                    watchedFolder: ['srv/app'],
                    env: {
                        PORT: '3000'
                    }
                }
            }
        },

        /* Launch multiple task in parallel*/
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.registerTask('default', ['sass', 'browserify2', 'concurrent']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-browserify2');
};