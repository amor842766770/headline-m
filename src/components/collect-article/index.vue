<template>
  <van-icon
    :color="value ? '#ffa500' : '#777'"
    :name="value ? 'star' : 'star-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
    async onCollect() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.value) {
          // 已收藏
          await delCollect(this.articleId)
        } else {
          // 没有收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        // 收藏成功以后的提示
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
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