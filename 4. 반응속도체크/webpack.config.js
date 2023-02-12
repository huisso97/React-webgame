const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  name: "wordrelay-setting",
  mode: "development", // 실서비스 : production
  devtool: "eval", // 빠르게
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: ["./client"], // 배열로 넣음
  }, // 입력 -> client, WordRelay
  module: {
    rules: [
      {
        test: /\.jsx?/, // jsx, js 파일에 룰을 적용하겠다
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  }, // entry 파일에 모듈을 적용한다.
  plugins: [new RefreshWebpackPlugin()],
  output: {
    // 현재 폴더(__dirname) 안에 "dist"를 자동으로 생성
    path: path.join(__dirname, "dist"),
    // 출력파일명
    filename: "app.js",
  },
  devServer: {
    // 결과물을 dist 에 저장해주고, 소스코드에 변경사항이 있을 때마다 결과물에 수정 내역을 반영해준다(hot reloading)
    devMiddleware: { publicPath: "/dist" },
    // index.html과 같이 실제 정적 파일이 존재하는 경로를 static에 넣는다
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
