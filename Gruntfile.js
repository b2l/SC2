module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Project configuration.
    grunt.initConfig({

        mochaTest: {
            srv: {
                options: {
                    reporter: 'tap'
                },
                src: ['srv/tests/**/*.js']
            }
        }

    });
};