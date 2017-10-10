const webpack = require('webpack');
const path = require('path');
const cssModuleLoader = require('./webpack/css-module-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const LAUNCH_COMMAND = process.env.npm_lifecyle_event;
const { IP, NODE_ENV } = process.env;
const env = NODE_ENV;
const isProduction = env === 'production' || LAUNCH_COMMAND === 'production';

function findBuildDir() {
  switch (env) {
    case 'production':
      return 'master';
    default:
      return 'build';
  }
}

const extractStyles = new ExtractTextPlugin({
  filename: 'css/application.css',
  disable: !isProduction,
  allChunks: true,
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const PATHS = {
  // this app will be the entry point;
  app: [
    path.join(__dirname, 'src/javascript/index.jsx'),
  ],
  // this will be the output path;
  build: path.resolve(__dirname, findBuildDir()),
};

const environment = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(env),
    IP: `'${IP}'`,
  },
});

if (isProduction) {
  console.log('Bundling for production...');
} else {
  PATHS.app.push('webpack-hot-middleware/client');
  console.log('Bundling for development...');
}

// this is for vendor caching
const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-thunk',
];

const isVendor = module => (
  module.context && module.context.indexOf('node_modules') !== -1
);

const entryPoint = isProduction
  ? {
    bundle: PATHS.app,
    vendor: VENDOR_LIBS,
  } : {
    bundle: PATHS.app,
  };

const base = {
  entry: entryPoint,
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/',
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  module: {
    rules: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['env'] } },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['env'] } },
      { // regular css files
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: cssModuleLoader(isProduction),
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=fonts/',
        exclude: [/images/],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader?name=[name].[ext]&outputPath=img/'],
        exclude: [/fonts/],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
};

const developmentBuild = {
  // this doubles the size of the output the app is 3.4mb before adding this
  devtool: 'cheap-module-inline-source-map',
  plugins: [
    extractStyles,
    HtmlWebpackPluginConfig,
    environment,
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const productionBuild = {
  plugins: [
    extractStyles,
    HtmlWebpackPluginConfig,
    environment,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: module => isVendor(module),
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, minimize: true }),
  ],
};

module.exports = Object.assign({}, base,
  isProduction ? productionBuild : developmentBuild);
