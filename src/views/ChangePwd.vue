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
            @click="fixpassword"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
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
    //修改密码
    async fixpassword(){
      if(this.pwd1==this.pwd2)
      {  
        var params = new URLSearchParams();
      params.append("oldPassword", this.oldpwd);
      params.append("newPassword", this.pwd1);
        var result = await this.$http.post("/user/resetPassword",params);
        if(result.code==200)
        {
             Notify({ type: "success", message: "修改密码成功！请重新登录" });
              this.$router.push('/login')
        }
        else{
            Notify({ type: "warning", message: "修改失败，原密码错误或网络问题！" });
        }
      }
      else{
              Notify({ type: "warning", message: "两次密码输入不相同！" });
      }
    }
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
