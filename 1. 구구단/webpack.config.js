const path = require("path");
const webpackConfig = require("../2. 끝말잇기/webpack.config");

module.exports = {
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"], // 1% 이상이(한국에서)  쓰는 브라우저
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          // LoaderOptionsPlugin -> loader의 모든 옵션들에 해당하는 것들을 다 디버깅하도록 하는 설정
          plugins: [new webpackConfig.LoaderOptionsPlugin({ debug: true })],
        },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};
