const path = require('path');
const webpack = require('webpack');

const SRC_FOLDER = '/src/client/';
const BUILD_FOLDER = '/src/build/client/';

module.exports = {
  entry: path.normalize(`${__dirname}${SRC_FOLDER}client.ts`),
  output: {
    path: path.normalize(`${__dirname}${BUILD_FOLDER}`),
    filename: 'client-bundle.js',
    library: 'App',
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 20,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig-client.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(Object.keys(process.env).reduce((resObj, key) => {
      const obj = resObj;
      obj['process.env'] = {};
      obj[`process.env.${key}`] = process.env[key];
      return obj;
    }, {})),
  ],
  devtool: 'source-map',
};
