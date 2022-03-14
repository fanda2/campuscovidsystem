<template>
  <div class="content">
    <div class="top">
      <div><span>西华大学疫情防控系统登录</span></div>
    </div>
    <div class="form">
      <van-form>
        <van-field
          readonly
          clickable
          name="picker"
          :value="value"
          label="身份选择"
          placeholder="点击选择您的身份"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          v-model="studentNum"
          name="学号/工号"
          label="学号/工号"
          placeholder="请输入学号/工号"
          :rules="[{ required: true, message: '请填写学号/工号' }]"
        />
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" @click="login">提交</van-button>
        </div>
      </van-form>
      <div class="bottom">
        <span @click="gopassword">忘记密码？</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      studentNum: "", //学号/工号
      username: "", //用户姓名
      password: "", //密码
      value: "学生", //用户身份，默认学生
      result: 1, //表示选择的身份
      columns: [
        { text: "学生", value: 1 },
        { text: "教职工", value: 0 },
      ],
      showPicker: false,
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value.text;
      this.result = value.value;
      this.showPicker = false;
    },
    //忘记密码
    gopassword() {
      this.$router.push("/fixpwd");
    },
    //登录
    async login() {
      // 参数格式化
      var params = new URLSearchParams();
      params.append("stuNo", this.studentNum);
      params.append("password", this.password);
      if (this.studentNum && this.password) {
        var result = await this.$http.post("/user/login", params);
        if (result) {
          if (result.code == 400) {
            Notify({ type: "warning", message: "密码错误！" });
          }
          Notify({ type: "success", message: "登陆成功，欢迎使用" });
          sessionStorage.setItem("token", result.data);
          sessionStorage.setItem("status", 1);
          this.Getmsg();
          this.reset();
        }
      } else {
        Notify({ type: "warning", message: "信息不能为空！" });
      }
    },
    //获取用户信息的方法，根据token获取
    async Getmsg() {
      // 参数格式化
      var result = await this.$http.get("/user/getUserDetail");
      if (result) {
        if (result.code == 400) {
          Notify({ type: "warning", message: "获取信息失败！" });
        }
        else{
          sessionStorage.setItem("message",JSON.stringify(result.data.list[0]))
        this.$router.push("/tab/home");
        }
       
      }
    },
    // 重置数据方法
    reset() {
      this.studentNum = "";
      this.password = "";
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  height: 160px;
  line-height: 160px;
  text-align: center;
  background: url(../img/background.png) no-repeat;
  background-size: cover;
  font-size: 18px;
  font-weight: bold;
  color: white;
  letter-spacing: 2px;
}
.form {
  margin: 20px auto;
  width: 90%;
}
.van-field {
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.van-button {
  margin-top: 20px;
}
.bottom {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
</style>
