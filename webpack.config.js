const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 3001
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({template: "./src/index.html"}),
    new CleanWebpackPlugin()
  ]
}