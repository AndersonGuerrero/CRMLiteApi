const path = require('path')
const DotenvPlugin = require('webpack-dotenv-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

require('dotenv').config({
  path: '.env'
})

module.exports = {
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals()],
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
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } })
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.bundle.min.js'
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
  devtool: 'eval'
}
