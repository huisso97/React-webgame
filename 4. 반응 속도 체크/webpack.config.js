const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'response-check-dev',
  mode: 'development', // 실서비스 : production
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './client',
  }, // 입력 -> client
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['react-refresh/babel'],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  }, // entry 파일에 모듈을 적용한다.
  plugins: [new ReactRefreshWebpackPlugin()],
  output: {
    // 현재 폴더(__dirname) 안에 "dist"를 자동으로 생성
    path: path.join(__dirname, 'dist'),
    // 출력파일명
    filename: 'app.js',
    publicPath: '/dist',
  },
  devServer: {
    // 결과물을 dist 에 저장해주고, 소스코드에 변경사항이 있을 때마다 결과물에 수정 내역을 반영해준다(hot reloading)
    devMiddleware: { publicPath: '/dist' },
    // index.html과 같이 실제 정적 파일이 존재하는 경로를 static에 넣는다
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
