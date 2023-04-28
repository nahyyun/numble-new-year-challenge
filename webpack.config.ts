const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://43.201.103.199",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
  plugins: [new Dotenv()],
};
