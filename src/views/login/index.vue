<template>
  <div class="login-container">
    <van-nav-bar title="标题" left-arrow class="page_nav_bar" />
    <!-- 登录表单  -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="usr.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="usrFormRule.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji" vue-else></i>
      </van-field>
      <van-field
        v-model="usr.code"
        name="code"
        placeholder="请输入验证码"
        :rules="usrFormRule.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            finish="onSendSms"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            size="small"
            round
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/usr";


export default {
  name: "LoginIndex",
  data() {
    return {
      isCountDownShow: "",
      password: "",
      usr: {
        mobile: "",
        code: "",
      },
      usrFormRule: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8|]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const usr = this.usr;

      // 2.表单验证
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      // 3.提交表单请求登录
      try {
        const { data } = await login(this.usr);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功！");
        // 登录成功,跳转回原来页面 back方式不严谨
        this.$router.back()

      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登陆失败，请稍后再试！");
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 2.验证通过,显示倒计时
      this.isCountDownShow = true;
      // 3.请求发送验证码
      try {
        const res = await sendSms(this.usr.mobile);
        console.log(res);
        this.$toast.successt("发送成功");
      } catch (err) {
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("请求太频繁,请稍后再试");
        } else {
          this.$toast("发送失败,请稍后再试");
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.login-container {
  .toutiao {
    font-size: 18px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    color: #666;
    padding: 0;
    font-size: 22px;
  }
  .login-btn-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>