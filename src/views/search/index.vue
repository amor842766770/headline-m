<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        clearable
        @search="onSearch"
        @cancel="onCancel"
        @focus="isSearchResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isSearchResultShow"
      :search-text="searchText"
    ></search-result>

    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>

    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-history="searchHistory"
      @clear-history="searchHistory = []"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from "./components/search-history"
import SearchResult from "./components/search-result"
import SearchSuggestion from "./components/search-suggestion"
import { setItem, getItem } from "@/utils/store"
export default {
  name: 'searchIndex',
  data() {
    return {
      searchText: '',
      isSearchResultShow: false,// 控制搜索结果的显示状态
      searchHistory: getItem("TOUTIAO_SEARCH_HISTORY") || []//搜索的历史记录数据
    };
  },
  methods: {
    onSearch(val) {
      //更新文本框内容
      this.searchText = val.trim()
      if (this.searchText == "") {
        this.$toast('不能输入空数据')
      } else {
        //存储搜索历史记录
        // 需求 不能有重复数据 最新的在最前
        const index = this.searchHistory.indexOf(val)
        if (index !== -1) {
          this.searchHistory.splice(index, 1)
        }
        this.searchHistory.unshift(val)
        // 渲染搜索结果
        this.isSearchResultShow = true
      }
    },
    onCancel() {
      this.$router.back()
    },
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  watch: {
    searchHistory(val) {
      setItem("TOUTIAO_SEARCH_HISTORY", val)
    }
  },
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  /deep/.van-icon-delete {
    font-size: 38px;
    margin-top: 8px;
  }
}
</style>
