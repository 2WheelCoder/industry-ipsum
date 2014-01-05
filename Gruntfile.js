module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', '**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      options: {
        livereload: true
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('watch', ['watch']);

};