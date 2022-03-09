<template>
  <div class="content">
    <div class="top">
      <div class="intop">
          <span>{{school}}</span>
      </div>
      <div class="inbottom">
        <div class="left">
          <img src="../img/student.png" alt="" />
        </div>
        <div class="right">
          <ul>
            <li><span>姓名：</span>{{ name }}</li>
            <li><span>学号：</span>{{ studentNum }}</li>
            <li><span>学院：</span>{{ college }}</li>
            <li><span>班级：</span>{{ mygrade }}级{{ myclass }}班</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mid">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "张三",
      studentNum: "3120180905110",
      college: "计算机与软件工程学院",
      mygrade: 2018,
      myclass: 1,
      school:"西华大学"
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .top {
    position: absolute;
    left: 10%;
    top: 4%;
    border-radius: 10px 0 0 10px;
    height: 170px;
    width: 90%;
    background: #ffffff;
    box-shadow: -5px 5px 5px 0px rgb(211, 211, 211);
    letter-spacing: 2px;
    font-size: 14px;
    font-weight: bold;
    .intop {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #79dbd9;
      border-radius: 10px  0 0 0;
      font-size: 14px;  
      letter-spacing: 2px;
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
.mid{
    width:90%;
    height: 300px;
    margin: 220px auto;
    background: palevioletred;
}
</style>
