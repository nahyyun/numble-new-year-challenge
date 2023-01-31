const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    path: __dirname + "/dist",
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
};
