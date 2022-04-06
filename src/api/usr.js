/*
用户相关请求模块
 */
import request from '@/utils/request'
import store from '@/store'

//请求登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
// 请求发送验证码
export const sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
    })
}
//请求用户信息
export const getUsrInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // header: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
// 请求用户频道信息
export const getUsrChannelLs = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels',
    })
}
