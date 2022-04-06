import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'// 动态设置rem值
import './utils/dayjs' //加载dayjs，初始化配置

import { NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Grid, GridItem, List, PullRefresh, Popup, } from 'vant';


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

<<<<<<< HEAD
=======
import { NavBar, Form, Field, Toast, CountDown } from 'vant';

Vue.use(CountDown);
Vue.use(Toast);
Vue.use(Vant);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);

>>>>>>> eaa26ac34f3c236a66086ab8ffd8e6379009acce


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
