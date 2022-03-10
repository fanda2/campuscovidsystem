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
    <div class="calendar">
      <van-calendar
        type="multiple"
        :show-title="false"
        :default-date="datalist"
        :min-date="mindata"
        :poppable="false"
        :show-confirm="false"
        :style="{ height: '500px' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iscard: 0, //是否已经打卡
      mindata: new Date(),
      datalist: [],
    };
  },

  methods: {
    onClickLeft() {
      console.log("ddd");
      this.$router.push("/tab/home");
    },
    gocard() {
      this.$router.push("/Card");
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
</style>
