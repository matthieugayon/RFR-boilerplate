const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const res = p => path.resolve(__dirname, p)

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(res('../node_modules'))
  .filter(
    x =>
      !/\.bin|flexboxgrid|react-flexbox-grid|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        x
      )
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: ['fetch-everywhere', res('../server/render.js')],
  externals,
  output: {
    path: res('../buildServer'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader/locals',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]--[hash:base64:8]'
          }
        },
        include: /flexboxgrid/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:8]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ],
        exclude: /flexboxgrid/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.scss']
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
