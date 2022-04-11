<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
  >
    已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
  >
    关注
  </van-button>
</template>

<script>
import { addFollow, delFollow } from '@/api/usr/';

export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.value) {//已关注，删除关注
          await delFollow(this.userId)
        } else {//未关注 添加关注 
          await addFollow(this.userId)
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('input', !this.value)
      } catch (error) {
        let msg = '操作失败，请重试！'
        console.log(error);
        if (error.response && error.response.status === 400) {
          msg = '你不能关注你自己！'
        }
        this.$toast(msg)
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>