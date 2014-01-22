'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/**/*.js']
      },
      simple: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        options: {
          spawn: false
        },
        files: ["lib/**/*.js", "test/**/*_test.js"],
        //tasks: ['mochaTest']
      }
      //lib: {
        //files: '<%= jshint.lib.src %>',
        //tasks: ['jshint:lib', 'nodeunit']
      //},
      //test: {
        //files: '<%= jshint.test.src %>',
        //tasks: ['jshint:test', 'nodeunit']
      //},
    },
  });

  // On watch events configure mochaTest to run only on the test if it is one
  // otherwise, run the whole testsuite
  var defaultSimpleSrc = grunt.config('mochaTest.simple.src');
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('mochaTest.simple.src', defaultSimpleSrc);
    if (filepath.match('test/')) {
      grunt.config('mochaTest.simple.src', filepath);
      grunt.task.run('mochaTest:simple');
    } else if (filepath.match('lib/')) {
      var testpath = filepath.replace('lib', 'test').replace('.js', '_test.js');
      grunt.config('mochaTest.simple.src', testpath);
      grunt.task.run('mochaTest:simple');
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);

};
