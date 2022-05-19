module.exports = {
  transpileDependencies: [
    'vuetify'
  ],module.exports = {
    devServer: {
        // This will forward any request that does not match a static file to localhost:3000
        proxy: 'http://localhost:3000'
    }
}

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
