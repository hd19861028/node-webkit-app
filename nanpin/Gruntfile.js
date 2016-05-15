
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compress: {
			main: {
				options: {
					archive: '../build/app.zip'
				},
				files: [{
					src: ['index.html', 'page2.html', 'page3.html', 'package.json'],
					filter: 'isFile'
				}, {
					expand: true,
					cwd: 'css/',
					src: ['**'],
					dest: 'css/'
				}, {
					expand: true,
					cwd: 'js/',
					src: ['**'],
					dest: 'js/'
				}, {
					expand: true,
					cwd: 'img/',
					src: ['**'],
					dest: 'img/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('build', 'the publish step task!!', function() {
		var taskArray = [
			'compress'
		];
		grunt.task.run(taskArray);
	});
};