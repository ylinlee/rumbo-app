module.exports = function ( grunt ) {
  'use strict';

	grunt.initConfig({
		express: {
			dev: {
				options: {
					script: 'server.js',
					port: 3000
				}
			}
		},
		watch: {
		  options: {
		    livereload: false
		  }
		}
	});

	grunt.registerTask('default', [
		'express:dev',
		'watch'
	]);

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

};