const webpack = require('webpack'); // to access built-in plugins
const path = require('path');

module.exports = {
  entry: {
    header_app: './src/index.js',
    authentication: './src/authentication.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // new webpack.EnvironmentPlugin({
    // 'process.env': {
    //   'NODE_ENV': 'lalalalalallalala',
    // },
    //   NODE_ENV: 'development',
    // }),
  ],
};
