/*
评论请求模块
*/

import request from '@/utils/request'

// 获取文章评论列表
export const getComments = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params,
    })
}
// 对评论点赞
export const addLike = target => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        },
    })
}
// 取消对评论点赞
export const delLike = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`,
    })
}
// 发布评论
export const postComment = data => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}