module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('node_modules/grunt/package.json'),
		jasmine: {
			all: {
				src: ['js/*.js' ],
				options: {
					//'vendor': ['path/to/vendor/libs/*.js'],
					'specs': ['specs/*.js' ]
				}
			}
		}, 
 		jshint: {
    			all: ['gruntfile.js', 'js/**/*.js', '!js/vendor/*.js', 'specs/**/*.js']
  		},
		watch: {
			js: {
				files: [
					'js/*.js',
					'specs/*.js',
				],
				tasks: ['jshint:all','jasmine:all']
			}
		}
 
	});
 
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
};