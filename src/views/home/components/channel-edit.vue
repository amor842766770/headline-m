<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(obj, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(obj, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-if="isEdit && !fixedChannel.includes(obj.id)"
        ></van-icon>
        <!-- v-bind:class 语法 
            一个对象，对象中的key表示要作用的css类名 对象中的value 要计算出布尔值 true 则作用该类名 false 不作用类名
         -->
        <span class="text" slot="text" :class="{ active: index === active }">
          {{ obj.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recomment-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="channel in recommendChannele"
        :key="channel.id"
        :text="channel.name"
        @click="onAddChannnel(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelLs, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/store.js'

export default {
  data() {
    return {
      allChannelLs: [],//所有频道数据
      isEdit: false,
      fixedChannel: [0]
    }
  },
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created() {
    this.loadAllChannelLs()
  },
  computed: {
    ...mapState(['user']),
    recommendChannele() {
      const channels = []
      this.allChannelLs.forEach(channel => {
        // 使用 find 遍历数组，找到满足条件的元素项
        const ret = this.myChannels.find(userChannels => {
          return userChannels.id === channel.id
        })
        // 如果我的频道中不包括该频道项，则收集到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }
  },
  methods: {
    async loadAllChannelLs() {
      try {
        const { data } = await getAllChannelLs()
        this.allChannelLs = data.data.channels
      } catch (error) {
        console.log(error);
        this.$toast('获取数据失败')
      }
    },
    async onAddChannnel(channel) {
      this.myChannels.push(channel)

      //   数据持久化
      if (this.user) {
        //   已登录 把数据请求接口放到线上
        try {
          await addUserChannel({
            id: channel.id, // 频道 ID
            seq: this.myChannels.length // 序号
          })
        } catch (error) {
          this.$toast('保存失败，请稍后再试')
          console.log(error);
        }

      } else {
        //   未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(obj, index) {
      if (this.fixedChannel.includes(obj.id)) {
        return
      }
      if (this.isEdit) {
        //   编辑状态，执行删除频道
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 持久化处理
        this.deleteChannel(obj)
      } else {
        //   非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(obj) {
      try {
        console.log(1);
        if (this.user) {
          await deleteUserChannel(obj.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        console.log(1);
        this.$toast('操作失败，请稍后重试')
      }
    },
  }
}

</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .text {
      font-size: 22px;
    }
    .text.active {
      color: red;
    }
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 22px;
        color: #222;
        margin-top: 4px !important;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recomment-grid {
    .grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 22px;
          line-height: 22px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
