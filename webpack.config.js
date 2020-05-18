const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		saph: 'saph-browser/lib/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'assets/npm'),
	}
}
