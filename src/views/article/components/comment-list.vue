<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请稍后重试！"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    };
  },
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created() {
    // 手动初始onLoad的话，他不会自动开始初始的loading
    // 手动开启初始loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      //1.请求获取数据
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsadsadasfdsfds')
        // }
        //2.将数据添加到列表中
        const { results } = data.data;
        this.list.push(...results)
        // console.log(this.list);
        //把文章评论数量传递到外部
        this.$emit('onload-success', data.data)
        //3.将loading设置为 false  
        this.loading = false
        //4.判断是否有数据
        if (results.length) {
          this.offset = data.data.last_id//有就更新获取下一页的数据页码
        } else {
          this.finished = true//没有就将finished设置结束
        }
      }

      // 有就更新获取下一页的数据页码
      // 没有就将finshed设置结束   
      catch (error) {
        this.error = true
        this.loading = false
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>