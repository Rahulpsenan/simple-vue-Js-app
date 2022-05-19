module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
    devServer: {
        // This will forward any request that does not match a static file to localhost:3000
        proxy: 'https://vuejschartlibrary.netlify.app/'
    },


  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true
    }
  }
}
