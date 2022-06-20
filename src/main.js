import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/styles/app.scss'
import DefaultLayout from './layouts/DefaultLayout.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './fontawesome-imports.js'

Vue.use(Toast)
Vue.component('default-layout', DefaultLayout)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
