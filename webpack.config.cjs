const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Configura el modo a 'development' para depuración
  target: 'web',       // Objetivo para Web (navegadores)
  
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',   // Valor predeterminado
      SERVER_HOST: 'localhost',  // Valor predeterminado
      SERVER_PORT: 8080          // Valor predeterminado
    }),
    new webpack.HotModuleReplacementPlugin(), // Para soporte de HMR
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Archivos .js y .jsx
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
