var path = require('path');

module.exports = {
	watch: false,
	target: 'electron-renderer',
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		renderer: `./src/renderer/renderer.ts`
		// view: `./src/renderer/views/index.pug`
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{ test: /\.pug?$/, loader: "pug-loader" },
		]
	}
};