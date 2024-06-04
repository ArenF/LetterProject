const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
        {
            test: /\.jsx?/,
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
        },
        {
            test: /.css?$/,
            exclude: [],
            use: ["style-loader", "css-loader"],
        },
    ]
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new Dotenv({
        path: '.env'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ],
};