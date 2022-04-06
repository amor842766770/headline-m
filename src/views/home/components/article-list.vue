<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        >
        </article-item>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticleLs } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isreFreshLoading: false,// 控制下拉刷新的 loading 状态
      list: [], // 文章列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      error: false, // 是否加载失败
      timestamp: null, // 请求下一页数据的时间戳
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    // 当触发上拉加载更多的时候调用该函数
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticleLs({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 2. 把数据添加到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3. 设置本次加载中 loading 状态结束
        this.loading = false

        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    async onRefresh() {
      try {
        // 请求获取数据
        // 1. 请求获取数据
        const { data } = await getArticleLs({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新，每次请求获取最新数据，所以传递当前最新时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 2. 将数据追加到列表的顶部
        const { results } = data.data

        this.list.unshift(...results)


        // 3. 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`

      } catch (error) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
