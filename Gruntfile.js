module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'js/*.js'],
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

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
      express: {
        files:  [ 'index.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // Without this option specified express won't be reloaded
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('dev', ['express:dev', 'watch']);

};