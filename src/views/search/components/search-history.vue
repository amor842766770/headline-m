<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isDelShow" @click="$emit('clear-history')"> 全部删除</span>
      &nbsp;
      <van-icon name="delete" @click="isDelShow = !isDelShow"></van-icon>
    </van-cell>
    <van-cell
      :title="val"
      v-for="(val, index) in searchHistory"
      :key="index"
      @click="onSearchItenClick(val, index)"
    >
      <van-icon name="close" v-if="isDelShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  data() {
    return {
      isDelShow: false//控制删除显示状态
    }
  },
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  // prop数据   是受父组件数据影响的
  //   如果是普通数据(数字,字符串,布尔值)绝对不能修改
  //   即便改了也不会传到给父组件

  //    如果是引用类型数据 (数组 ,对象)
  //    可以修改 , 例如 [].push(xxx)  对象.xxx=xxx
  //    不能重新赋值  xxx=[]
  methods: {
    onSearchItenClick(item, index) {
      if (this.isDelShow) {
        // 删除状态
        this.searchHistory.splice(index, 1)
      } else {
        // 非删除状态
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>
</style>