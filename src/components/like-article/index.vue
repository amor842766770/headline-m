<template>
  <van-icon
    :color="value === 1 ? '#e5645f' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onLike() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，删除点赞
          await delLike(this.articleId)
        } else {
          // 没有点赞，添加点赞
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        // 收藏成功以后的提示
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败，请重试！')
        console.log(error);
      }
    }
  }
}
</script>

<style>
</style>