<template>
  <div class="container">
    <van-nav-bar
      title="外出申请"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="top">
      <div><span>外出申请情况</span></div>
    </div>
    <div class="bottom" v-if="outstatus == 1">
      <div class="intop" style="color: green">请假信息详细</div>
      <div class="inbox">
        <img :src="codeImg" alt="" />
      </div>
      <div class="inbottom">
        <span @click="godetial">点击查看请假详情</span>
      </div>
    </div>
    <div class="bottom" v-if="outstatus === ''">
      <div class="intop" style="color: red">请假已过期</div>
      <div class="inbox"></div>
      <div class="inbottom"><span @click="godetial">点击重新申请</span></div>
    </div>
    <div class="bottom" v-if="outstatus === 0">
      <div class="intop" style="color: darkcyan">请假正在审核</div>
      <div class="inbox"></div>
      <div class="inbottom"><span @click="godetial">点击查看详情</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outstatus: "", //外出申请状态
      codeImg: "", //二维码
    };
  },
  created() {
    this.GetStatus();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/tab/home");
    },
    // 获取用户返校申请状态
    async GetStatus() {
      var result = await this.$http.get("/out-school-apply/userlist", {
        params: {
          pagenum: 1,
          pagesize: 200,
        },
      });
      if (result.code == 200 && result.data.list != null) {
        //总数字
        var arr = result.data.list[0];
        var databack = arr.outSchoolBackDate.split(" ")[0];
        console.log(databack);
        var mydata = new Date();
        console.log();
        if (
          databack.split("-")[0] > mydata.getFullYear() ||
          (databack.split("-")[0] == mydata.getFullYear() &&
            databack.split("-")[1] > mydata.getMonth()) ||
          (databack.split("-")[0] == mydata.getFullYear() &&
            databack.split("-")[1] >= mydata.getMonth() &&
            databack.split("-")[2] >= mydata.getDay())
        ) {
          this.outstatus = arr.outSchoolAuditStatus;
          this.BackTime = arr.outSchoolBackDate;
          this.health = arr.outSchoolHealthStatus;
          this.season = arr.outSchoolReason;
          this.OutStyle = arr.outSchoolTransports;
        }
        if (this.outstatus == 1) {
          this.getCode();
        }
      }
    },
    //获取请假二维码
    async getCode() {
      const result = await this.$http({
        method: "post",
        url: "/out-school-apply/qrcode",
        responseType: "blob",
      });
      console.log(result);
      if (result != null) {
        //    let blob = new Blob(result) // 假设文件为pdf
        this.codeImg = window.URL.createObjectURL(result);
        console.log(this.codeImg);
      }
    },
    //进入请假详情页
    godetial() {
      this.$router.push("/Out");
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  height: 160px;
  line-height: 160px;
  text-align: center;
  background: url(../../img/background.png) no-repeat;
  background-size: cover;
  font-size: 24px;
  font-weight: bold;
  color: white;
  letter-spacing: 4px;
}
.bottom {
  width: 80%;
  height: 250px;
  margin: 40px auto;
  text-align: center;
  .inbox {
    width: 200px;
    height: 200px;
    margin: 0px auto;
    // background: darkcyan;
    img{
      width: 200px;
      height: 200px;
    }
  }
  .inbottom {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 15px;
    color: rgb(241, 104, 50);
  }
}
.intop {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
}
</style>
