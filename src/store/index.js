import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/store'


Vue.use(Vuex)

const TOKEN_KEY = "TOUTIAO_TOKEN"

export default new Vuex.Store({
  state: {
    //存储当前登录的用户信息
    //user 一个对象,存储当前登录用户信息(token等数据)
    user: getItem(TOKEN_KEY)
  },
  getters: {

  },
  mutations: {
    //对user进行修改
    setUser(state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)//为了防止刷新丢失,我们需要把数据备份到本地存储
    }
  },
  actions: {
  },
  modules: {
  }
})
