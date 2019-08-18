const path = require('path')
const DotenvPlugin = require('webpack-dotenv-plugin')
const webpack = require('webpack')
const NoDemonPlugin = require('nodemon-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

require('dotenv').config({
  path: '.env'
})
let extern = [nodeExternals()]

if (process.env.isNow === 'true') {
  extern = path.join(__dirname, '../node_modules')
}

module.exports = {
  entry: './src/index.js',
  target: 'node',
  externals: extern,
  stats: {
    errors: true,
    warnings: false
  },
  plugins: [
    new DotenvPlugin({
      path: '.env',
      sample: '.env-example',
      allowEmptyValues: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } }),
    new NoDemonPlugin()
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.bundle.dev.js'
  },
  watchOptions: {
    poll: 1000
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: 'graphql-import-loader' }]
      }
    ]
  },
  // devtool: 'source-map'
  devtool: 'eval'
}
