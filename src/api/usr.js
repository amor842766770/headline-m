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
// 关注用户
export const addFollow = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}
// 取消关注
export const delFollow = target => {
    return request({
        method: 'DELETE',
        url: '/v1_0/user/followings/' + target,
    })
}

// 获取当前登录用户资料
export const getUsrProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',
    })
}
// 修改当前登录用户资料
export const editUsrProfile = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}
// 修改当前登录用户头像
export const editUsrImg = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}


