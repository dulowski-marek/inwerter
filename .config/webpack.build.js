const path = require('path');
const webpack = require('webpack');

const EnableProduction = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	}),
	new webpack.LoaderOptionsPlugin({
		debug: false, minify: true
	})
];
const Minify = require('babel-minify-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, '..'),
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, '..'),
		filename: 'index.umd.js',
		libraryTarget: 'umd',
		library: {
			root: 'Inwerter',
			amd: 'inwerter',
			commonjs: 'inwerter'
		}
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
				use: [{
					loader: 'ts-loader',
					options: {
						compilerOptions: {
							declaration: false
						}
					}
				}]
			}
		]
	},

	plugins: [
		...EnableProduction,
		new Minify()
	]
};
