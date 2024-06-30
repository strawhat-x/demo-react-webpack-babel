const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash:8].js',
  },
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
    extensions: ['.jsx', '...'],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|svg|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10000,
              },
            },
          }
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      title: 'React Webpack Babel',
    }),
  ],
};
