const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', 
  target: 'web',  
  entry: {
    main: ['./src/client/index.jsx']
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
    new webpack.HotModuleReplacementPlugin(), 
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/, // Archivos .js y .jsx
        exclude: /node_modules/, // Excluir node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.(png|jpeg|jpg|svg)$/, // Archivos de imagen
        use: 'file-loader'
      },
      {
        test: /\.css$/, // Archivos CSS
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  
  resolve: {
    extensions: ['.js', '.jsx'], // Extensiones a resolver automáticamente
  }
};
