module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({

        mochaTest: {
            srv: {
                options: {
                    reporter: 'tap'
                },
                src: ['srv/tests/**/*.js']
            }
        },

        nodemon: {
            dev: {
                options: {
                    file: 'srv/app/app.js'
                }
            }
        },

        watch: {
            server: {
                files: 'srv/app/**/*.js',
                tasks: ['nodemon:dev', 'mochaTest:srv']
            },
            tests: {
                files: 'srv/tests/**/*.js',
                tasks: ['mochaTest:srv']
            }
        }
    });

    grunt.registerTask('default', ['nodemon:dev', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');

};