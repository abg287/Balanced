const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    main: ['webpack-hot-middleware/client?reload=true&timeout=2000', './src/client/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/public/index.html',
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'SERVER_HOST',
      'SERVER_PORT',
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', {'runtime': 'automatic'}]]
          }
        }
      },
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
