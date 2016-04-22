var fs = require('fs');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/* 全局配置  */
		config: {
			static_dest: 'dist/',
			source_path: 'spa-not/',
			gzip_publish: 'gzip/',
			html_extension: '.html',
			webconfig: {
				"Expires": "'Wed, 22 Jul 2037 16:24:33 GMT'"
			}
		},
		/* 将指定的路径内所有文件打包成zip */
		compress: {
			main: {
				options: {
					archive: '../app.zip'
				},
				files: [{
					src: ['index.html', 'logo.png', 'package.json', 'api.js'],
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
					cwd: 'lib/',
					src: ['**'],
					dest: 'lib/'
				}, {
					expand: true,
					cwd: 'page/',
					src: ['**'],
					dest: 'page/'
				}, {
					expand: true,
					cwd: 'node_modules/',
					src: ['qr-image/**', 'request/**'],
					dest: 'node_modules/'
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