var webpack = require('webpack');
var path = require('path');

var CompressionPlugin = require('compression-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

// Webpack Configr build
var webpackConfig = {
  entry: {
    'polyfills': './src/polyfills-browser.ts',
    'main':      './src/main-browser.ts',
  },

  output: {
    path: './dist',
  },

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loader: 'ts-loader' },
      // .json files for json files
      { test: /\.json$/, loader: 'json-loader' },
      // .html files for json files
      { test: /\.html$/, loader: 'raw-loader' },
      // .css files for json files
      { test: /\.css$/, loader: 'raw-loader' },


    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: packageSort(['polyfills', 'main'])
    }),
    new WebpackMd5Hash(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8,
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    }),
    new webpack.DefinePlugin({
      'isDart': false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],

};

















// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  cache: true,

  output: {
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].map',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
          path.join(__dirname, 'node_modules', '@igorminar'),
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles'),
      path.join(__dirname, 'node_modules', 'ts-helpers'),
    ]
  },

  mainFields: ['jsnext:main', 'main', 'browser'],
  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js', '.json'],
    packageMains: ['jsnext:main', 'main', 'browser'],
    // alias: {
    //   '@igorminar/core': path.resolve(__dirname, 'node_modules/@igorminar/core/esm/core.js'),
    //   '@igorminar/platform-browser': path.resolve(__dirname, 'node_modules/@igorminar/platform-browser/esm/platform_browser.js'),
    //   '@igorminar/router': path.resolve(__dirname, 'node_modules/@igorminar/router/esm/router.js'),
    //   '@igorminar/http': path.resolve(__dirname, 'node_modules/@igorminar/http/esm/http.js')
    // },
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },


  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);

function packageSort(packages) {
  // packages = ['polyfills', 'vendor', 'main']
  var len = packages.length - 1;
  var first = packages[0];
  var last = packages[len];
  return function sort(a, b) {
    // polyfills always first
    if (a.names[0] === first) {
      return -1;
    }
    // main always last
    if (a.names[0] === last) {
      return 1;
    }
    // vendor before app
    if (a.names[0] !== first && b.names[0] === last) {
      return -1;
    } else {
      return 1;
    }
  }
}

function reverse(arr) {
  return arr.reverse();
}
