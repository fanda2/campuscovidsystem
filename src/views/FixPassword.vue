<template>
  <div class="content">
    <div class="top">
      <span>找回密码</span>
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
          name="学号"
          label="学号"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请填写学号' }]"
        />
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="phoneNum"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <van-field
          v-model="pwd1"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="pwd2"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >确认</van-button
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
        studentNum:"",
      username: "",
      phoneNum:"",
      code:"",
      pwd1: "",
      pwd2:"",
      value: "学生",
      result:1,  //表示选择的值
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
      this.result = value.value;
      this.showPicker = false;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  .top {
    height: 140px;
    width: 100%;
    background: #43cbcb;
    line-height: 140px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    letter-spacing: 4px;
  }
}
.van-field {
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.van-button {
  margin-top: 20px;
}
</style>
