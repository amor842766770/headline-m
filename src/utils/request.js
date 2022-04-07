/*
封装axios请求模块
*/

import axios from 'axios'
import store from '@/store'

const request = axios.create(
    { baseURL: "http://toutiao.itheima.net" }
)

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config：本次请求的请求配置对象
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
    return config
}, function (error) {
    // 如果请求出错了（还没有发出去）会进入这里
    return Promise.reject(error)
})


// 响应拦截器
// 如果token过期了，就跳转到登录页，重新登录获取新的token

request.interceptors.response.use(function (response) {
    // 响应成功（状态码2xx）开头的时候执行
    console.log('响应了成功的状态码');
    return response;
}, async function (error) {
    // 1. 如果状态码为401
    if (error.response && error.response.status == 401) {
        // 1. 判断有没有refresh_token，如果没有跳转登录页
        const user = store.state.user

        // 2. 如果有refresh_token，调用刷新token的接口，拿到新的token
        if (user && user.refresh_token) {

            const res = await axios({
                method: 'PUT',
                url: 'http://toutiao.itheima.net/v1_0/authorizations',
                headers: {
                    Authorization: `Bearer ${user.refresh_token}`
                }
            })
            console.log(res.data.data.token);

            // 1. 更新vuex和loaclStoreage存储的token
            store.commit('setUser', {
                token: res.data.data.token,
                refresh_token: user.refresh_token
            })

            // 2. 为原来调用接口方，重新去调用接口
            console.log(error.config);
            return request(error.config)
        }
    }
    return Promise.reject(error);
});

export default request