<template>
  <div class="updata-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('over')"
      @change=""
      @confirm="onEdit"
    />
  </div>
</template>

<script>
import { editUsrProfile } from "@/api/usr"
import dayjs from "dayjs"

export default {
  name: 'UpdataBirthday',
  data() {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  created() {
  },
  props: {
    value: {
      type: String,
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUsrProfile({
          birthday: currentDate
        })
        //更新视图
        this.$emit('input', currentDate)
        // 关闭弹层
        this.$emit('over')
        // 提示成功
        this.$toast.success('更新成功！')
      } catch (error) {
        this.$toast.fail('更新失败！')
        console.log(error);
      }
    },
  }

}
</script>

<style>
</style>