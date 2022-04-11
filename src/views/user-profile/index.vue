<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page_nav_bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avtar" fit="cover" round :src="usr.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="usr.name"
      is-link
      @click="isChangeNameShow = true"
    />
    <van-cell
      title="性别"
      :value="usr.gender === 0 ? '男' : '女'"
      is-link
      @click="isChangeGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="usr.birthday"
      is-link
      @click="isChangeBirthdayShow = true"
    />
    <!-- /个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup style="height: 50%" v-model="isChangeNameShow" position="bottom">
      <updata-name
        @close="isChangeNameShow = false"
        v-model="usr.name"
        v-if="isChangeNameShow"
      />
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup
      style="height: 50%"
      v-model="isChangeGenderShow"
      position="bottom"
    >
      <updata-gender
        @cancel="isChangeGenderShow = false"
        v-model="usr.gender"
        v-if="isChangeGenderShow"
      />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup
      style="height: 50%"
      v-model="isChangeBirthdayShow"
      position="bottom"
    >
      <updata-birthday
        @over="isChangeBirthdayShow = false"
        v-model="usr.birthday"
        v-if="isChangeBirthdayShow"
      />
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup style="height: 100%" position="bottom" v-model="isAvatarShow">
      <updata-avatar
        :img="img"
        @close="isAvatarShow = false"
        @update-photo="usr.photo = $event"
        v-if="isAvatarShow"
      ></updata-avatar>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUsrProfile } from "@/api/usr"
import UpdataName from "./components/updata-name"
import UpdataGender from "./components/updata-gender"
import UpdataBirthday from "./components/updata-birthday"
import UpdataAvatar from "./components/updata-avatar"
export default {
  name: 'userProfiler',
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataAvatar
  },
  data() {
    return {
      usr: {},
      isChangeNameShow: false,
      isChangeGenderShow: false,
      isChangeBirthdayShow: false,
      isAvatarShow: false,
      img: null
    }
  },
  created() {
    this.loadUsrProfile()
  },
  methods: {
    async loadUsrProfile() {
      try {
        const { data } = await getUsrProfile()
        this.usr = data.data
      } catch (error) {
        this.$toast('请求失败，请稍后重试！', error)
      }
    },
    //更新头像
    onFileChange() {
      //获取文件对象
      const file = this.$refs.file.files[0]
      //基于文章对象获得blob数据
      this.isAvatarShow = true
      const data = window.URL.createObjectURL(file)
      this.img = data
      // 展示预览图片弹出层
      console.log(data);
      //file-input如果选了同一个文件不会触发change事件
      // 解决办法：每次使用完毕，就把他的value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar__title,
.van-icon-arrow-left {
  color: #fff;
}
.avtar {
  height: 60px;
  width: 60px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>