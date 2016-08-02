module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: ['./public/**/*.js'],
        dest: './public/app.min.js'
      },
      css: {
        src: ['./public/css/**/*.css'],
        dest: './public/css/style.min.css'
      }
    },
    uglify: {
      js: {
        src: './public/app.min.js',
        dest: './public/app.min.js'
      }
    },
    cssmin: {
      dist: {
        files: {
           './public/css/style.min.css': ['./public/css/**/*.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
