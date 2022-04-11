import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'// 动态设置rem值
import './utils/dayjs' //加载dayjs，初始化配置

import { NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Grid, GridItem, List, PullRefresh, Popup, Search, Picker, DatetimePicker } from 'vant';


Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(Search);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(CountDown);
Vue.use(Toast);
Vue.use(Vant);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Popup);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
