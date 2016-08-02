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
        },
        mainFiles: {
          bootstrap: ['dist/css/bootstrap.min.css'],
          'font-awesome': ['css/font-awesome.css']
        },
        dependencies: {
          'bootstrap': ['jquery'],
          'textAngular': ['rangy']
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
           './public/dist/css/style.min.css': ['./public/dist/css/style.css'],
           './public/dist/css/_bower.min.css': ['./public/dist/css/_bower.css']
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, cwd: './public/bower_components/bootstrap/fonts/', src: ['*'], dest: './public/dist/fonts' },
          { expand: true, cwd: './public/bower_components/font-awesome/fonts/', src: ['*'], dest: './public/dist/fonts' },
          { expand: true, cwd: './public', src: ['pages/**/*.html'], dest: './public/dist' }
        ]
      }
    },

    processhtml: {
      dist: {
        files: {
          './public/dist/index.html': ['./public/index.html']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', ['concat', 'bower_concat', 'uglify', 'cssmin', 'copy', 'processhtml']);
};
