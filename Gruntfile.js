module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        src: ['./public/**/*.js'],
        dest: './public/app.min.js'
      }
    },
    uglify: {
      build: {
        src: './public/app.min.js',
        dest: './public/app.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);
};
