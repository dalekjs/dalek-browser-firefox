module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js']
    },

    nodeunit: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['test/*_TEST.js']
    },

    complexity: {
      generic: {
        src: ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js'],
        options: {
          cyclomatic: 3,
          halstead: 8,
          maintainability: 100
        }
      }
    },

    plato: {
      all: {
        options : {
          jshint : false
        },
        files: {
          'reports': ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js']
        },
      },
    },

    docco: {
      options: {
        output: 'docs/docco'
      },
      all: ['index.js', 'lib/**/*.js']
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: '.',
          outdir: 'docs/yui'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-plato');

};
