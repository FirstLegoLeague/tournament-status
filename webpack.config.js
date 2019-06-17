const HtmlWebPackPlugin = require('html-webpack-plugin')

const { MockAPIRouter } = require('./dev/mock-api-router')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: ['@babel/proposal-class-properties']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpeg|jpg|tif|gif|ico)$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './node_modules/@first-lego-league/user-interface/current/assets/img/first-favicon.ico'
    })
  ],
  devServer: {
    open: true,
    hot: true,
    setup: function(app) {
      app.use(MockAPIRouter);
    }
  }
};
