<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  data() {
    return {
      message: ''
    }
  },
  // 给所有后代提供组件
  // 注意 不要滥用
  inject: {
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onPost() {
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '发布中...',
          forbidClick: true // 是否禁止背景点击
        })
        const { data } = await postComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        console.log(data);

        // 清空文本框
        this.message = ""
        this.$emit("post-success", data.data)
        this.$toast.success("发布成功!")
      } catch (error) {
        this.$toast.fail('评论发布失败！')
        console.log(error);
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
