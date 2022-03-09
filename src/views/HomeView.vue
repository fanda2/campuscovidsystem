<template>
  <div class="container">
    <div class="username">
      <div class="top">新型冠状病毒肺炎</div>
      <div class="mid">群防群控，我们在行动</div>
      <div class="bottom">
        <span>西华大学</span>
        <span>{{ username }}</span>
      </div>
    </div>
    <div class="message">
      <div class="mtop">
        <span class="left">四川疫情动态</span>
        <span class="right" @click="gomap">查看详情></span>
      </div>
      <div class="mmid">
        <div class="left">
          <h5>{{ diagnosed }}</h5>
          <p>确诊</p>
        </div>
        <div class="mid">
          <h5>{{ cure }}</h5>
          <p>治愈</p>
        </div>
        <div class="bottom">
          <h5>{{ died }}</h5>
          <p>死亡</p>
        </div>
      </div>
      <div class="mbottom">
        <span> 数据截止{{ time }}，数据来源于四川省人民政府官网 </span>
      </div>
    </div>
    <div class="main">
     <div class="title"> <p>信息上报</p></div>
      <ul>
        <li>
          <img src="../img/ico1.png" alt="" />
          <p>自诊打卡</p>
        </li>
        <li>
          <img src="../img/ico2.png" alt="" />
          <p>体温上报</p>
        </li>
        <li>
          <img src="../img/ico3.png" alt="" />
          <p>行程报告</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "张三",
      time: "2000.03.09",
      diagnosed: 100,
      cure: 50,
      died: 3,
    };
  },
  methods: {
    gomap() {
      this.$router.push("/covmap");
    },
  },
};
</script>
<style lang="less" scoped>
.username {
  width: 100%;
  height: 200px;
  background: paleturquoise;
  background: url(../img/bg.jpg) no-repeat;
  background-size: 100%;
  font-weight: bold;
  .top {
    padding-left: 12px;
    font-size: 18px;
    margin: 0 auto;
    height: 40px;
    width: 90%;
    color: aliceblue;
    margin: 0 auto;
    text-shadow: 2px 2px 2px #6c36ff;
    padding-top: 20px;
  }

  .mid {
    width: 90%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    letter-spacing: 2px;
    font-size: 30px;
    margin: 0 auto;
    color: aliceblue;
    text-shadow: 3px 4px 4px #6c36ff;
  }
  .bottom {
    width: 90%;
    height: 40px;
    margin: 0 auto;
  }
  span {
    padding-left: 12px;
    font-size: 16px;
  }
}
.message {
  width: 94%;
  border-radius: 10px;
  height: 120px;
  position: absolute;
  top: 180px;
  left: 3%;
  z-index: 9;
  background: white;
  box-shadow: 3px 4px 4px #bebebe;
  .mtop,
  .mmid,
  .mbottom {
    width: 90%;
    margin: 0 auto;
  }
  .mtop {
    height: 40px;
    line-height: 40px;
    text-align: center;
    .left {
      font-size: 18px;
      float: left;
      font-weight: bold;
    }
    .right {
      float: right;
      font-size: 14px;
    }
  }
  .mmid {
    height: 60px;
    display: flex;
    justify-content: space-between;
    div {
      margin-top: 5px;
      text-align: center;
      h5 {
        color: #6c36ff;
      }
      p {
        font-size: 16px;
      }
    }
  }
  .mbottom {
    height: 20px;
    font-size: 13px;
    text-align: center;
  }
}
.main {
  padding-top: 120px;
  .title{
    width: 90%;
    margin: 0 auto;
    border-left: 5px solid rgb(116, 207, 200)
  }
  p{
    font-size: 16px;
    padding-left: 8px;
  }
  ul {
    list-style-type: none;
    margin-top: 10px;
    padding: 0px;
  }
  li {
    text-align: center;
    font-size: 14px;
    // margin: 8px;
    // padding: 4px;
    float: left;
    width: 33.33333%;;
    height: 90px;
    p{
      margin-top: 5px;
    }
  }
  img{
    width: 60px;
    height: 60px;

  }
}
</style>
