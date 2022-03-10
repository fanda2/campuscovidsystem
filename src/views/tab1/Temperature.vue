<template>
  <div class="content">
    <van-nav-bar
      title="体温信息上报"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="time"
          label="时间选择"
          placeholder="点击选择时间"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            @confirm="onConfirmtime"
            @cancel="showPicker = false"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="numberPicker"
          :value="temp1"
          label="上午测温"
          placeholder="点击选择温度"
          @click="morning"
        />
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            @confirm="onConfirmtemp"
            show-toolbar
            title="体温选择"
            :columns="columns2"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="numberPicker"
          :value="temp2"
          label="下午测温"
          placeholder="点击选择温度"
          @click="afternoon"
        />
        <van-popup v-model="showPicker3" position="bottom">
          <van-picker
            @confirm="onConfirmtemp1"
            show-toolbar
            title="体温选择"
            :columns="columns2"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="numberPicker"
          :value="temp3"
          label="夜间测温"
          placeholder="点击选择温度"
          @click="evening"
        />
        <van-popup v-model="showPicker4" position="bottom">
          <van-picker
            @confirm="onConfirmtemp2"
            show-toolbar
            title="体温选择"
            :columns="columns2"
          />
        </van-popup>
        <!-- <van-field v-model="studentNum" name="上午测温" label="上午测温" /> -->
      </van-form>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      studentNum: "",
      username: "",
      phoneNum: "",
      code: "",
      pwd1: "",
      pwd2: "",
      nowdate: new Date().getHours(),
      result: 1, //表示选择的值
      time: "", //用户选择时间
      showPicker: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      columns2: [
        // 第一列
        {
          values: [35, 36, 37, 38, 39, 40],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          defaultIndex: 1,
        },
      ],
      temp1: "", //上午温度
      temp2: "", //下午温度
      temp3: "", //夜间温度
    };
  },

  methods: {
    onClickLeft() {
      console.log("ddd");
      this.$router.push("/tab/home");
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    onConfirmtime(time) {
      const d = new Date(time);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this.time = resDate;
      this.showPicker = false;
    },
    onConfirmtemp(value) {
      this.temp1 = value[0] + value[1] * 0.1;
      this.showPicker2 = false;
    },
    onConfirmtemp1(value) {
      this.temp2 = value[0] + value[1] * 0.1;
      this.showPicker3 = false;
    },
    onConfirmtemp2(value) {
      this.temp3 = value[0] + value[1] * 0.1;
      this.showPicker4 = false;
    },
    onSubmit() {
      console.log("提交");
    },
    morning() {
      if (this.nowdate > 0 && this.nowdate < 10) {
        this.showPicker2 = true;
      } else {
        Dialog({ message: "当前时间不可提交" });
      }
    },
    afternoon() {
      if (this.nowdate > 10 && this.nowdate < 15) {
        this.showPicker3 = true;
      } else {
        Dialog({ message: "当前时间不可提交" });
      }
    },
    evening() {
      if (this.nowdate > 15 && this.nowdate < 24) {
        this.showPicker4 = true;
      } else {
        Dialog({ message: "当前时间不可提交" });
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
.van-button {
  margin-top: 20px;
}
</style>
