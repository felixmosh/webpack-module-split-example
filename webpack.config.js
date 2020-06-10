const path = require('path');
const crypto = require('crypto');

module.exports = {
  entry: {
    first: './src/pages/first.js',
    second: './src/pages/second.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    filename: 'script-[name].js', // name of the generated bundle
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        formComponents: {
          chunks: 'all',
          minChunks: 1,
          name(module) {
            const libPath = path.resolve(path.join('node_modules/@example/forms'))
            const folderBasedChunk = path.relative(libPath, module.context);
            const hash = crypto.createHash('sha1');
            hash.update(folderBasedChunk)
            return hash.digest('hex').substring(0, 8)
          },
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
          test: /[\\\/]node_modules[\\\/]@example[\\\/]forms[\\\/]src[\\\/]forms[\\\/]/,
        },
      },
    },
  },
  resolve: {
    modules: ['node_modules', path.resolve(process.cwd(), 'src')],
    extensions: ['.ts', '.js'],
  }
};
