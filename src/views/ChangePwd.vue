<template>
  <div class="container">
    <div class="top">
      <van-nav-bar
        title="修改信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <van-form>
        <van-field
          v-model="oldpwd"
          name="原始密码"
          label="原始密码"
          placeholder="请输原始密码"
          :rules="[{ required: true, message: '请填写原始密码' }]"
        />
        <van-field
          v-model="pwd1"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请输新密码"
          :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <van-field
          v-model="pwd2"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请再次填写新密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="onsubmit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        usertype: "学生",
        suername: "张三",
        studentNum: "3120180905110",
      },
      value: "",
      oldpwd: "",
      pwd1: "",
      pwd2: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/tab/myinfo");
    },
    onsubmit() {
      if (this.oldpwd == "" && this.pwd1 == "" && this.pwd2 == "") {
        console.log("提交为空");
      } else {
        console.log("输入不为空");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.mid {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  .btn {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
  }
}
</style>
