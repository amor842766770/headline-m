<template>
  <!-- :to="'/article/' + article.art_id" -->
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <div slot="title" class="title">{{ article.title }}</div>

    <div slot="label" class="label">
      <div class="cover-warp" v-if="article.cover.type === 3">
        <div
          class="image-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image width="100" height="100" :src="img" fit="cover" />
        </div>
      </div>
      <span class="author-name">{{ article.aut_name }}</span>
      &nbsp;
      <span>{{ article.comm_count }}评论</span>
      &nbsp;
      <span>{{ article.pubdate | relativeTime }}</span>
    </div>

    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      width="100"
      height="100"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  created() {

  }
}
</script>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-warp {
    display: flex;
    padding: 30px 0;
    justify-content: space-between;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
