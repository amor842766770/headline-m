<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(val, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', val)"
    >
      <div slot="title" v-html="hightLight(val)"></div>
    </van-cell>
    <!-- 双花括号绑定会直接输出纯文本内容 -->
    <!-- <div>{{ htmlStr }}</div> -->
    <!-- 使用v-html指令可以绑定渲染带有html标签的字符串 -->
    <!-- <div v-html="htmlStr"></div> -->
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from "lodash";
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestions: [],//联想建议数据列表
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      //   注意：handler函数名称是固定的
      handler: debounce(function (val) {
        this.loadSuggestion(val)
      }, 150)
      ,
      immediate: true//该回调会在侦听开始之后立即被调用
    }
  },
  methods: {
    async loadSuggestion(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options.filter(item => item != null)
      } catch (error) {
        this.$toast('数据获取失败，请稍后再试', error)
      }
    },
    hightLight(text) {
      const hlStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 中间的内容都会当作匹配字符来使用,而不是数据变量
      // 如果需要根据数据变量动态创建正则表达式,则手动 new RegExp
      // RegExp 正则表达式后遭函数
      // 参数1 匹配模式字符串,会根据字符串创建正则表达式
      // 参数2 匹配模式,要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return (text).replace(reg, hlStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>