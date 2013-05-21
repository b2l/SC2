module.exports = function(grunt) {
    grunt.initConfig({

        watch: {
            js: {
                files: ['assets/javascripts/**/*.js'],
                tasks: ['browserify2:compile']
            },
            sass: {
                files: ['assets/stylesheets/**/*.js'],
                tasks: ['compass']
            },
            js_test: ['tests/**/*.js'],
            tasks: ['browserify2:test']
        },

        browserify2: {
            compile: {
                entry: './assets/javascripts/app.js',
                compile: './public/app.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify2');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('compile', 'browserify2:compile');
    grunt.registerTask('test', 'browserify2:test');
    grunt.registerTask('default', ['watch']);
}