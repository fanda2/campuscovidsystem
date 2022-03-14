<template>
  <div class="container">
    <div class="top">
      <van-nav-bar
        title="自诊打卡"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="mid">
      <span class="outspan" v-show="iscard">今日已打卡</span>
      <div v-show="!iscard" class="btn">
        <van-button type="primary" class="btn2" block @click="gocard"
          >打卡</van-button
        >
        <span class="inbtn"
          >本人承诺所填报的数据真实有效，愿意承担相应责任</span
        >
      </div>
    </div>
    <div class="mainBox">
      <Calendar
        :textTop="['S', 'M', 'T', 'W', 'T', 'F', 'S']"
        v-on:choseDay="clickDay"
        :sundayStart="true"
        :markDate="arrDate"
      >
      </Calendar>
    </div>
  </div>
  <!-- :markDate="arrDate"
        :agoDayHide="1514937600"
        :futureDayHide="1525104000"
        :sundayStart="true" -->
</template>

<script>
import Calendar from "vue-calendar-component";
import {Dialog} from "vant"
export default {
  name: "calendar",
  data() {
    return {
      iscard: 0, //是否已经打卡
      mindata: new Date(),
      arrDate: [],
      loginstatus: sessionStorage.getItem("status"),
    };
  },
  components: { Calendar },
  created() {
    this.getdatalist();
  },
  methods: {
    onClickLeft() {
      console.log("ddd");
      this.$router.push("/tab/home");
    },
    gocard() {
      this.$router.push("/Card");
    },
    // 获得个人打卡信息
    async getdatalist() {
      if (this.loginstatus == 0||this.loginstatus==null) {
        Dialog.confirm({
          title: "提示",
          message:
            "现在还未登录，是否跳转到登录界面。",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$router.push("/tab/home");
          });
       
      } else {
        const result = await this.$http("/clock-in/getCurrentMonth");
        if (result.data.length != 0) {
          var arr = [];
          for (var item in result.data) {
            var str = result.data[item].clockInDate;
            arr.push(str.split(" ")[0]);
          }
          this.arrDate = arr;
          var length=arr.length;
          var lastcard = arr[length-1];
          var myDate = new Date(); //获取系统当前时间 //获取当前年份(2位) //获取当前月份(0-11,0代表1月)
          // 获取完整的年份(4位,1970-????)
          if (
            lastcard.split("-")[0]==myDate.getFullYear()&&
            lastcard.split("-")[1].replace(/\b(0+)/gi, "") ==
              myDate.getMonth() + 1 &&
            lastcard.split("-")[2].replace(/\b(0+)/gi, "") == myDate.getDate()
          ) {
            this.iscard = 1;
          }
        }
      }
    },
    //设置日期格式
    clickDay(today) {
      // today格式为2020/8/7 改为 20200807
      let date = today.split("/");
      if (date[1].length < 2) {
        date[1] = "0" + date[1];
      }
      if (date[2].length < 2) {
        date[2] = "0" + date[2];
      }
      date = date.join("");
    },
  },
};
</script>

<style lang="less" scoped>
.mid {
  width: 100%;
  height: 140px;
  //   line-height: 140px;
  text-align: center;
  .outspan {
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
}
.btn2 {
  margin-top: 40px;
}
.btn {
  width: 80%;
  margin: 0px auto;
}
.inbtn {
  font-size: 13px;
  color: rgb(179, 179, 179);
}
.mainBox {
  width: 100%;
  width: 100%;
  .wh_content_all {
    background-color: #08214d;
    .wh_top_changge li {
      color: #5186b8;
    }
    .wh_content_item {
      .wh_item_date {
        color: #1ae558;
      }
      .wh_other_dayhide {
        color: #bfbfbf;
      }
      .wh_chose_day {
        background: #ff6219;
        color: #333333;
      }
      .wh_isToday {
        background: #e69823;
        color: #0d0b0b;
      }
    }
  }
}
</style>
