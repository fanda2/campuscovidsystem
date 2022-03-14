<template>
  <div class="content">
    <div class="top">
      <div class="intop">
        <span>{{ school }}</span>
      </div>
      <div class="inbottom">
        <div class="left">
          <img src="../img/student.png" alt="" />
        </div>
        <div class="right">
          <ul>
            <li><span>姓名：</span>{{ usermsg.name }}</li>
            <li><span>学号：</span>{{ usermsg.stuNo }}</li>
            <li><span>学院：</span>{{ usermsg.faculty }}</li>
            <li>
              <span>班级：</span>{{ usermsg.grade }}{{ usermsg.classes }} <span v-show="userStatus==1">班</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="userStatus == 1" class="mid">
      <div class="inbox">
        <div class="item" @click="godetail">
          <div class="ico"><img src="../img/menu3.png" alt="" /></div>
          <div class="inmid"><span>个人详情查看</span></div>
          <div><span>></span></div>
        </div>
        <div class="item" @click="gopwd">
          <div class="ico"><img src="../img/menu1.png" alt="" /></div>
          <div class="inmid"><span>修改密码</span></div>
          <div><span>></span></div>
        </div>
         <div class="item" @click="goroute">
          <div class="ico"><img src="../img/menu4.png" alt="" /></div>
          <div class="inmid"><span>行程上报记录</span></div>
          <div><span>></span></div>
        </div>
        <div class="item" @click="goactivity">
          <div class="ico"><img src="../img/menu2.png" alt="" /></div>
          <div class="inmid"><span>活动申请详情</span></div>
          <div><span>></span></div>
        </div>
        <van-button type="info" block @click="unlogin">退出登录</van-button>
      </div>
    </div>
    <div v-if="userStatus == 0||userStatus==null" class="mider">
      <van-button type="primary" block @click="gologin">点击登录</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      usermsg: {
        name: "",
        stuNo: "",
      },
      userStatus: sessionStorage.getItem("status"),
      school: "西华大学",
      show: false,

    };
  },
  created() {
    this.GetStatus();
  },
  methods: {
    //退出登录
    unlogin() {
      Dialog.confirm({
        title: "提示",
        message: "是否退出登录",
      })
        .then(() => {
          sessionStorage.removeItem("token");
          sessionStorage.setItem("status", 0);
          sessionStorage.removeItem("message");
          this.$router.push("/tab/home");
        })
        .catch(() => {});
    },
    gologin() {
      this.$router.push("/login");
    },
    //获取检查登录状态获取用户信息
    GetStatus() {
      const status = sessionStorage.getItem("status");
      if (status == 1) {
        let msg = JSON.parse(sessionStorage.getItem("message"));
        this.usermsg = msg;
      }
    },
    godetail() {
      this.$router.push("/detail");
    },
    goroute(){
      this.$router.push({name:"routedet",params:{backroute:2}});
    },
    gopwd() {
      this.$router.push("/changepwd");
    },
    goactivity()
    {
       this.$router.push({name:"activitydet",params:{backroute:2}});
    }
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../img/background.png) no-repeat;
  background-size: 100%;
  .top {
    border-radius: 10px;
    height: 170px;
    width: 90%;
    background: #ffffff;
    box-shadow: 5px 5px 5px rgb(211, 211, 211);
    letter-spacing: 2px;
    font-size: 14px;
    font-weight: bold;
    margin: 10px auto;
    .intop {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #42a9e6;
      color: #ffffff;
      border-radius: 10px 10px 0 0;
      font-size: 14px;
      letter-spacing: 3px;
    }
    .inbottom {
      width: 100%;
      display: flex;
      .left {
        width: 100px;
        img {
          width: 80px;
          padding-top: 30px;
          padding-left: 10px;
        }
      }
      .right {
        ul {
          padding-top: 20px;
          padding-left: 5px;
        }
        li {
          height: 30px;
        }
      }
    }
  }
}
//未登录时显示
.mider {
  width: 90%;
  height: 50px;
  margin: 200px auto;
}
.mid {
  width: 90%;
  height: 300px;
  margin: 0 auto;
  .inbox {
    height: 300px;
    width: 100%;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid rgba(230, 230, 230, 0.5);
    margin: 40px auto;
    box-shadow: 4px 4px 4px rgb(212, 212, 212);
    letter-spacing: 3px;
    .van-button {
      width: 80%;
      margin: 50px auto;
    }
    .inmid {
      width: 60%;
      span {
        float: left;
      }
    }
    .item {
      height: 50px;
      line-height: 50px;
      text-align: center;
      width: 96%;
      margin: 0px auto;
      font-weight: bold;
      font-size: 16px;
      display: flex;
      border-bottom: 1px solid rgb(187, 187, 187);
      img {
        width: 35px;
        height: 35px;
        padding: 10px;
      }
      .ico {
        width: 30%;
      }
    }
  }
}
</style>
