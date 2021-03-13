const path = require('path')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    // devtool: 'source-map',
    resolve: {
      alias: {
        vue$: "vue/dist/vue"
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        import: [path.resolve(__dirname, "src/assets/styles/global/colors.styl")]
      }
    }
  }
}