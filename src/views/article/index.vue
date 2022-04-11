<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!--
            模板中的 $event 是事件参数
            当我们传递给子组件的数据既要使用还要修改。
              传递：props
                :is-followed="article.is_followed"
              修改：自定义事件
                @update-is_followed="article.is_followed = $event"
            简写方式：在组件上使用 v-model
              value="article.is_followed"
              @input="article.is_followed = $event"

            如果需要修改 v-model 的规则名称，可以通过子组件的 model 属性来配置修改

            一个组件上只能使用一次 v-model，
            如果有多个数据需要实现类似于 v-model 的效果，咋办？
            可以使用属性的 .sync 修饰符。
           -->
          <follow-User
            class="follow-btn"
            :user-id="article.aut_id"
            v-model="article.is_followed"
          />
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="isLoadingShow"
          >
            已关注
          </van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="isLoadingShow"
          >
            关注
          </van-button> -->
        </van-cell>

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" info="123" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <collect-article
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <like-article
            v-model="article.attitude"
            :article-id="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
      </div>

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant';
import FollowUser from '@/components/follow-user/';
import CollectArticle from '@/components/collect-article/';
import LikeArticle from '@/components/like-article/';


export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle
  },
  data() {
    return {
      article: {},//文章详情
      loading: true,
      errStatus: 0,//失败的状态码
      isLoadingShow: false //关注按钮loading状态
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)

        this.article = data.data//数据驱动视图 不是立即的
        //初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0);

      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        console.log("获取数据失败", error);
      }
      this.loading = false//无论成功失败 都关闭loading
    },
    previewImage() {
      const articleContent = this.$refs['article-content']
      // 得到所有img节点
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src),
          item.onclick = () => {
            ImagePreview({
              images,
              startPosition: index,
            });
          }
      });
    },
    async onFollow() {
      this.isLoadingShow = true
      try {
        if (this.article.is_followed) {//已关注，删除关注
          await delFollow(this.article.art_id)
        } else {//未关注 添加关注 
          await addFollow(this.article.art_id)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        let msg = '操作失败，请重试！'
        if (res.response && res.response.status === 400) {
          msg = '你不能关注你自己！'
        }
        this.$toast(msg)
      }
      this.isLoadingShow = false
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .van-nav-bar {
    background-color: rgb(50, 150, 250);
    .van-nav-bar__title {
      color: #fff;
    }
    /deep/.van-icon {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
