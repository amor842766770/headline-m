<template>
  <div class="updata-name">
    <van-picker
      title="设置性别"
      show-toolbar
      :columns="columns"
      @cancel="$emit('cancel')"
      :default-index="gender"
      @confirm="onEdit"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { editUsrProfile } from "@/api/usr"

export default {
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  props: {
    value: {
      type: [Number],
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
        const localGender = this.gender
        await editUsrProfile({
          gender: localGender
        })

        //更新视图
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('cancel')
        // 提示成功
        this.$toast.success('更新成功！')
      } catch (error) {
        this.$toast.fail('更新失败！')
      }
    },
    onPickerChange(picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style lang="less" scoped >
</style>