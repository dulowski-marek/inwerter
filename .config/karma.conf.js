const webpack = require('./webpack.test');

module.exports = function(config) {
	config.set({
		basePath: '../',
		files: [
			'src/**/*.spec.ts'
		],

		preprocessors: {
			'src/**/*.spec.ts': ['webpack', 'sourcemap']
		},

		plugins: [
			'karma-webpack',
			'karma-mocha',
			'karma-chai',
			'karma-sourcemap-loader',
			'karma-chrome-launcher'
		],

		webpack: webpack,

		frameworks: [
			'mocha',
			'chai'
		],

		browsers: [
			'Chrome'
		],

		mime: {
			'text/x-typescript':['ts']
		},

		client: {
			mocha: {
				reporter: 'html',
				ui: 'bdd'
			}
		},

		autoWatch: true,
		singleRun: true,
		concurrency: Infinity
	});
}
