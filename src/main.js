import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'


// import VueApexCharts from 'vue-apexcharts'

import CommonManage from './Pages/CommonManage.vue'

import i18n from './i18n'
// Vue.use(VueApexCharts, CommonManage)

// Vue.component('apexchart', VueApexCharts)
Vue.component('common-manage', CommonManage)

Vue.config.productionTip = false
new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
