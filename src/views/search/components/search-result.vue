<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败,请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="obj in list"
        :key="obj.id"
        :title="obj.title"
        :to="`/article/${obj.art_id}`"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    };
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad() {
      try {
        //1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page,//页码
          per_page: 10,//每页大小
          q: this.searchText//铲鲟关键词
        })

        const { results } = data.data
        // 2.将数据添加到数组列表中
        this.list.push(...results)
        // 3.关闭本次加载中loading
        this.loading = false

        /**
         * test code>>>>>>>
         * 👇
         * 👇
         * if (Math.random() > 0.5) {
                JSON.parse('sadasdasd')
              }
         */


        // 4.判断是否还有数据

        if (results.length) {
          // 如果有,则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有,则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (error) {
        // 展示加载失败的的提示状态
        this.error = true
        this.loading = false
      }
    },
  },
};
</script>

<style>
</style>