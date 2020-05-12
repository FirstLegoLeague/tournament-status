/* eslint-disable node/exports-style */

const merge = require('webpack-merge')

const commonWebpackConfig = require('./webpack.config')

const webpackConfig = merge(commonWebpackConfig, {
  entry: null,
  output: null,
  devtool: 'inline-source-map',
  mode: 'development'
})

if (webpackConfig.module && webpackConfig.module.rules) {
  webpackConfig.module.rules
    .forEach(rule => {
      const isUseArray = Array.isArray(rule.use)
      const uses = isUseArray ? [].concat(rule.use) : [ rule.use ]

      uses.forEach((use, index) => {
        if (use === 'babel-loader') {
          const newUse = {
            loader: 'babel-loader',
            options: {
              plugins: [
                'rewire',
                'istanbul'
              ]
            }
          }

          if (isUseArray) {
            rule.use[index] = newUse
          } else {
            rule.use = newUse
          }
        } else if (use.loader === 'babel-loader') {
          use.options = use.options || {}
          use.options.plugins = use.options.plugins || []
          use.options.plugins.push('rewire')
          use.options.plugins.push('istanbul')
        }
      })
    })
}

module.exports = config => {
  config.set({
    files: [
      'test/**/*.test.js(x|)',
      'src/**/*.js(x|)',
      'text/services/env.test.js'
    ],

    frameworks: [ 'mocha' ],

    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-webpack'
    ],

    preprocessors: {
      'test/**/*.test.js(x|)': [ 'webpack' ],
      'text/services/env.test.js': [ 'webpack' ],
      'src/**/*.js(x|)': [ 'webpack' ]
    },

    reporters: [ 'mocha' ],

    webpack: webpackConfig,

    coverageReporter: {
      type: process.env.CI ? 'lcovonly' : 'text',
      dir: 'coverage/',
      subdir: 'ui',
      includeAllSources: true
    }
  })
}
