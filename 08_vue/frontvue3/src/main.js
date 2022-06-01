import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueToast from 'vue-toast-notification'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-toast-notification/dist/theme-sugar.css'

createApp(App)
  .use(store)
  .use(router)
  .use(BootstrapVue3)
  .use(VueToast)
  .mount('#app')
