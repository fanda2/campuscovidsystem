<template>
  <div class="content">
    <van-nav-bar
      title="行程记录详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form" v-for="(item, index) in detiallist" :key="index">
      <div class="item">
        <div class="basemsg">
          <span>{{ item.user.name }}</span
          ><span>{{ item.user.stuNo }}</span>
        </div>
        <div><span>出发地点：</span>{{ item.startingArea }}</div>
        <div><span>到达地点：</span>{{ item.arrivalArea }}</div>
        <div><span>出行方式：</span>{{ item.startingWay }}</div>
        <div v-if="item.seatNumber != ''">
          <span>座位号：</span>{{ item.seatNumber }}
        </div>
        <div v-if="item.note != ''"><span>备注信息：</span>{{ item.note }}</div>
      </div>
    </div>
    <div class="nomsg" v-if="count == 0 || count == null">
      暂时没有提交数据记录
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      detiallist: [], //个人详情
      pagesize: 12,
      pagenum: 1,
      backroute: this.$route.params.backroute,
      count:0,
    };
  },
  created() {
    this.RouteGet();
  },
  methods: {
    //获取个人行程报告提交记录
    async RouteGet() {
      const result = await this.$http.get(
        "/trip-report/getTripReportByStudent",
        {
          params: {
            page: this.pagenum,
            size: this.pagesize,
          },
        }
      );
      if (result.code == 200) {
        this.detiallist = result.data.list;
        this.count=result.data.total;
      } else {
        Notify({ type: "warning", message: "查询信息，请稍后重试！" });
      }
    },
    onClickLeft() {
      if (this.backroute == 1) {
        this.$router.push("/Reporter");
      } else {
        this.$router.push("/tab/myinfo");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
}
.van-field {
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.note {
  margin-top: 20px;
  height: 120px;
  line-height: 20px;
}
.van-button {
  margin-top: 40px;
}
.item {
  padding: 10px;
  width: 90%;
  margin: 10px auto;
  border-radius: 5px;
  background: paleturquoise;
  box-shadow: 3px 3px 3px rgb(226, 226, 226);
  font-size: 16px;
  .basemsg {
    height: 30px;
    span {
      padding-left: 30px;
    }
  }
  div {
    width: 98%;
    margin: 6px auto;
  }
}
.nomsg {
  width: 100%;
  height: 200px;
  line-height: 200px;
  font-size: 16px;
  text-align: center;
}
</style>
