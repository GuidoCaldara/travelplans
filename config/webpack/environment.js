const { environment } = require('@rails/webpacker')
const WorkboxPlugin = require('workbox-webpack-plugin')

environment.plugins.append(
  'Provide',
  new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true
  })
)

module.exports = environment
