<template>
  <div class="container">
    <div class="top">
      <van-nav-bar
        title="详细信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          readonly
          v-model="user.usertype"
          name="用户身份"
          label="用户身份"
        />
        <van-field
          readonly
          v-model="user.studentNum"
          name="学号"
          label="学号"
        />
        <van-field readonly v-model="user.uesrname" name="姓名" label="姓名" />
        <van-field v-model="user.faculty" name="学院" label="学院" readonly />
        <van-field v-model="user.major" name="专业" label="专业" readonly />
        <van-field v-model="user.classes" name="年级" label="年级" readonly />
        <van-field v-model="user.grade" name="班级" label="班级" readonly />
        <van-field v-model="user.telephone" name="联系电话" label="联系电话"  />
        <van-field v-model="user.linkman" name="紧急联系人" label="紧急联系人" />
        <van-field v-model="user.linkmanTelephone" name="联系人电话" label="联系人电话" />
        <van-field v-model="user.nativePlace" name="籍贯" label="籍贯" />
        <van-field v-model="user.familyResidence" name="家庭住址" label="家庭住址" />
        <van-field v-model="user.currentResidence" name="现居地址" label="现居地址" />

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
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
      iscard: 0, //是否已经打卡
      user: {
        usertype: "学生",
        uesrname: "张三",
        studentNum: "3120180905110",
        faculty: "计算机与软件工程学院",
        major: "软件工程",
        classes: "软工[本]18-2",
        grade: "2018级",
        telephone: "13547677022",
        linkman: null,
        linkmanTelephone: null,
        nativePlace: null,
        familyResidence: null,
        currentResidence: null,
      },
      value: "",
    };
  },

  methods: {
    onClickLeft() {
      console.log("ddd");
      this.$router.push("/tab/myinfo");
    },
    onSubmit() {
      console.log("提交");
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
