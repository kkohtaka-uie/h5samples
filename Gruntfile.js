/*jslint indent: 2, node: true */

(function () {

  'use strict';

  var path, lrSnippet, folderMount, middleware;

  path = require('path');
  lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

  folderMount = function (connect, point) {
    return connect['static'](path.resolve(point));
  };

  middleware = function (connect, options) {
    return [lrSnippet, folderMount(connect, options.base)];
  };

  module.exports = function (grunt) {

    grunt.initConfig({
      connect : {
        main: {
          options : {
            port : 8888,
            base : '.',
            middleware : middleware
          }
        }
      },
      regarde : {
        html : {
          files : [
            'index.html',
            '*/*.html',
            'js/**/*.js',
            'css/**/*.css',
            'img/**/*'
          ],
          tasks : [ 'livereload' ]
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');

    grunt.registerTask(
      'default',
      [ 'livereload-start', 'connect', 'regarde' ]
    );
  };
}());

