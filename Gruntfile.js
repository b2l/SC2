module.exports = function(grunt) {
    grunt.initConfig({

        compass: {
            dev: {
                options: {
                    config: 'assets/compass_config.rb'
                }
            }
        },

        watch: {
            js: {
                files: ['assets/javascripts/**/*.js'],
                tasks: ['browserify2:compile']
            },
            jsTest: {
                files: ['assets/tests/**/*.js'],
                tasks: ['browserify2:test']
            },
            sass: {
                files: ['assets/stylesheets/**/*.scss'],
                tasks: ['compass:dev']
            },
            images: {
                files: ['assets/images/static/*'],
                tasks: ['copy:images']
            }
        },

        copy: {
            images: {
                files: [
                    {expand: true, cwd: 'assets/images/static', src: ['*'], dest: 'public/images', filer: 'isFile'}
                ]
            }
        },

        browserify2: {
            compile: {
                entry: './assets/javascripts/app.js',
                compile: './public/app.js'
            },
            test: {
                entry: './assets/tests/unitTest.js',
                compile: './assets/compiledTest/test.js'
            }
        },

//        qunit: {
//            all: ["./assets/tests/compiledTest/test.html"]
//        }

        "qunit-serverless": {
            all: {
                options: {
                    includeFiles: ['./public/javascripts/main.js'],
                    testFiles: ['./assets/compiledTest/test.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify2');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-qunit-serverless');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('compile', 'browserify2:compile');
    grunt.registerTask('test', 'qunit-serverless');
    grunt.registerTask('default', ['copy:images', 'compass:dev', 'watch']);
    grunt.registerTask('build', ['compass', 'compile']);
}
