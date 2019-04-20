import resolve from 'rollup-plugin-node-resolve';
import { terser as minify } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-filesize';

export default {
	input: 'dist/index.js',
	output: {
		file: 'dist/index.umd.js',
		format: 'umd',
		name: 'inwerter',
	},
	plugins: [
		resolve(),
		minify(),
		analyze(),
	],
}