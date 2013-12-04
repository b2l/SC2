var dot = require('dot');

module.exports = function(grunt) {
    grunt.registerMultiTask('dot-packer', 'compile dot template', function() {
        var options = this.options({
            destination: this.data.dest,
            path: this.data.source,
            global: false
        });

        dot.process(options);
    });
};