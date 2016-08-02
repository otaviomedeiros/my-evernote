module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: ['./public/**/*.js'],
        dest: './public/dist/js/app.js'
      },
      css: {
        src: ['./public/css/**/*.css'],
        dest: './public/dist/css/style.css'
      }
    },
    bower_concat: {
      all: {
        dest: {
          js: './public/dist/js/_bower.js',
          css: './public/dist/css/_bower.css'
        }
      }
    },
    uglify: {
      js: {
        src: './public/dist/js/app.js',
        dest: './public/dist/js/app.min.js'
      },
      bower_js: {
        src: './public/dist/js/_bower.js',
        dest: './public/dist/js/_bower.min.js'
      }
    },
    cssmin: {
      dist: {
        files: {
           './public/dist/style.min.css': ['./public/dist/css/**/*.css']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', ['concat', 'bower_concat', 'uglify', 'cssmin']);
};
