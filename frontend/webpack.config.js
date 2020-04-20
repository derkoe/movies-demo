const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.join(__dirname, '/src');

module.exports = {
  context: appPath,
  mode: 'development',
  devtool: 'source-map',
  entry: ['./index.jsx'],
  output: {
    filename: 'app.[hash].js',
    path: path.resolve(path.join(__dirname, '/dist')),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(path.join(__dirname, '/node_modules')),
      path.resolve(appPath)
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          includePaths: [appPath]
        }
      }]
    },
    {
      test: /\.(scss|sass)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [appPath]
          }
        }
      }]
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=100000'
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    sockPort: process.env.OKTEKO ? 443 : 8080,
    disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    proxy: {      
      '/api': process.env.OKTEKO ? 'http://movies-api:8080' : 'http://localhost:8081'
    }
  }
};
