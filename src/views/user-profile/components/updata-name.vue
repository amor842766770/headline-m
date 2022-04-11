<template>
  <div class="updata-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onEdit"
    >
    </van-nav-bar>
    <!-- 输入框 -->
    <div class="filed-warp">
      <van-field
        v-model.trim="localName"
        rows="1"
        autosize
        type="text"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
        class="van-field"
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { editUsrProfile } from "@/api/usr"

export default {
  name: 'UpdataName',
  data() {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: [String],
      required: true
    }
  },
  methods: {
    async onEdit() {
      try {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true,//禁止背景点击
          duration: 0//持续展示
        })
        const localName = this.localName

        if (!localName) {
          this.$toast('昵称不能为空')
          return
        }
        await editUsrProfile({
          name: localName
        })
        //更新视图
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功！')
      } catch (error) {
        this.$toast.fail('更新失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped >
.filed-warp {
  padding: 20px;
  // .van-field {
  //   border: 1px solid #333;
  // }
}
</style>