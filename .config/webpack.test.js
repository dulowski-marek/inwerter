const path = require('path');

module.exports = {
	devtool: 'inline-source-map',

	context: path.resolve(__dirname, '..'),
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'index.js'
	},

	resolve: {
		extensions: [
			'.js', '.ts'
		]
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
					'ts-loader'
				]
			}
		]
	}
}
