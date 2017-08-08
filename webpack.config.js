var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
      loaders: [
          {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel'},
          {test: /\.(png)$/, loader: 'url-loader?limit=100000'},
          {
              test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9].[0-9].[0-9].[0-9].[0-9])?$/,
              loader: 'url?limit=65000&mimetype=image/svg+xml&name=/[name].[ext]'
          },
          {
              test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9].[0-9].[0-9].[0-9].[0-9])?$/,
              loader: 'url?limit=65000&mimetype=application/font-woff&name=/[name].[ext]'
          },
          {
              test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9].[0-9].[0-9].[0-9].[0-9])?$/,
              loader: 'url?limit=65000&mimetype=application/font-woff2&name=/[name].[ext]'
          },
          {
              test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9].[0-9].[0-9].[0-9].[0-9])?$/,
              loader: 'url?limit=65000&mimetype=application/octet-stream&name=/[name].[ext]'
          },
          {
              test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9].[0-9].[0-9].[0-9].[0-9])?$/,
              loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=/[name].[ext]'
          },
          {test: /\.html$/, loader: 'raw'},
          {test: /\.(scss|sass)$/, loader: 'style!css!sass'},
          {test: /\.css$/, loader: 'style!css'}
      ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
