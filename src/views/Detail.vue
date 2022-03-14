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
      <van-form>
        <van-field
          readonly
          v-model="usertype"
          name="用户身份"
          label="用户身份"
        />
        <van-field readonly v-model="user.stuNo" name="学号" label="学号" />
        <van-field readonly v-model="user.name" name="姓名" label="姓名" />
        <van-field v-model="user.faculty" name="学院" label="学院" readonly />
        <van-field v-model="user.major" name="专业" label="专业" readonly />
        <van-field v-model="user.grade" name="年级" label="年级" readonly />
        <van-field v-model="user.classes" name="班级" label="班级" readonly />
        <van-field
          v-model="user.telephone"
          name="联系电话"
          label="联系电话"
          readonly
        />
        <van-field
          v-model="user.linkman"
          name="紧急联系人"
          label="紧急联系人"
        />
        <van-field
          v-model="user.linkmanTelephone"
          name="联系人电话"
          label="联系人电话"
        />
        <van-field v-model="user.nativePlace" name="籍贯" label="籍贯" />
        <van-field
          v-model="user.familyResidence"
          name="家庭住址"
          label="家庭住址"
        />
        <van-field
          v-model="user.currentResidence"
          name="现居地址"
          label="现居地址"
        />

        <div style="margin: 16px" class="newbtn">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="update"
            >更新信息</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {Notify} from "vant"
export default {
  data() {
    return {
      iscard: 0, //是否已经打卡
      usertype: "学生",
      user: {
        uesrname: "",
        studentNum: "",
        faculty: "",
        major: "",
        classes: "",
        grade: "",
        telephone: "",
        linkman: null,
        linkmanTelephone: null,
        nativePlace: null,
        familyResidence: null,
        currentResidence: null,
      },
      value: "",
    };
  },
  created() {
    this.GetStatus();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/tab/myinfo");
    },
    onSubmit() {
      console.log("提交");
    },
    //获取检查登录状态获取用户信息
    GetStatus() {
      const status = sessionStorage.getItem("status");
      if (status == 1) {
        let msg = JSON.parse(sessionStorage.getItem("message"));
        this.user = msg;
      }
    },
    //更新信息
    async update() {
      const result = await this.$http.put(
        "/user/updateUserDetail",
        {
          avatar: "",
          classes: this.user.classes,
          faculty: this.user.faculty,
          grade: this.user.grade,
          major: this.user.major,
          name: this.user.name,
          stuNo: this.user.stuNo,
          telephone: this.user.telephone,
          currentResidence: this.user.currentResidence,
          familyResidence: this.user.familyResidence,
          linkman: this.user.linkman,
          linkmanTelephone: this.user.linkmanTelephone,
          nativePlace: this.user.nativePlace,
        },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(result.code==200)
      {
         Notify({ type: "success", message: "信息更新成功！" });
         this.Getmsg();
      }
      else{
         Notify({ type: "warning", message: "获取更新失败！" });
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
        }
       
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
.newbtn{
  height: 100px;
}
</style>
