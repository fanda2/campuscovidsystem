<template>
  <div class="content">
    <div class="top">
      <div><span>西华大学疫情防控系统登录</span></div>
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
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
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
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
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
      <div class="bottom">
        <span @click="gopassword">忘记密码？</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentNum: "",
      username: "",
      password: "",
      value: '学生',
      result:1,  //表示选择的身份
      columns: [{text:'学生' ,value:1}, {text:'教职工',value:0}],
      showPicker: false,
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    onConfirm(value) {
      this.value = value.text;
      this.result=value.value;
      this.showPicker = false;
    },
    //忘记密码
    gopassword() {
      this.$router.push("/fixpwd");
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
