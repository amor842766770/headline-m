<template>
  <div class="homeIndex">
    <!-- 导航栏 -->
    <van-nav-bar class="page_nav_bar" fixed>
      <van-button
        slot="title"
        type="info"
        round
        size="small"
        icon="search"
        class="search-btn"
        to="/search"
      >
        搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list ref="article-list" :channel="channel" />
      </van-tab>

      <div slot="nav-right" class="humburger-btn" is-link @click="showPopup">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></channel-edit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUsrChannelLs } from '@/api/usr'
import ArticleList from "./components/article-list"
import ChannelEdit from "./components/channel-edit.vue"
import { mapState } from 'vuex'
import { getItem } from '@/utils/store.js'

export default {
  name: "homeIndex",
  data() {
    return {
      active: 0,
      channels: [],//用户频道列表
      show: false,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  components: {
    ArticleList,
    ChannelEdit,

  },
  created() {
    this.loadusrChannelLs()
  },
  methods: {
    // 获取频道列表
    async loadusrChannelLs() {
      // try {
      //   const { data } = await getUserChannels()
      //   this.channels = data.data.channels
      // } catch (err) {
      //   this.$toast('获取频道数据失败')
      // }
      let channels = []

      if (this.user) {
        // 已登录，请求获取用户频道列表
        const { data } = await getUsrChannelLs()
        channels = data.data.channels
      } else {
        // 未登录，判断是否有本地的频道列表数据
        const localChannels = getItem('TOUTIAO_CHANNELS')
        // 如果存在本地的频道列表数据
        if (localChannels) {
          channels = localChannels
        } else {
          // 没有，请求获取默认频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }

      this.channels = channels
    },
    showPopup() {
      this.show = !this.show;
    },
    onUpdateActive(index, show = true) {
      this.active = index
      this.show = show
    }
  }
};
</script>

<style lang="less" scoped>
.homeIndex {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 42px;
      color: #fff;
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
  }
  .humburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;

    i.toutiao {
      font-size: 33px;
    }
  }
}
</style>