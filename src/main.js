import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'// 动态设置rem值

import { NavBar, Form, Field, Toast, CountDown } from 'vant';

Vue.use(CountDown);
Vue.use(Toast);
Vue.use(Vant);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
