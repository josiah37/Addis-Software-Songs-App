const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
   entry: "./src/index.jsx",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
         },
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i, // custom rule for images/svg
            type: "asset/resource",
         },
      ],
   },
   resolve: {
      extensions: [".js", ".jsx"],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./public/index.html",
      }),
      new Dotenv(),
   ],
   devServer: {
      static: "./dist",
      hot: true,
      open: true,
      port: 3000,
   },
   mode: "development",
};
