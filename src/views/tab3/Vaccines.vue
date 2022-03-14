<template>
  <div class="content">
    <van-nav-bar
      title="疫苗接种信息上报"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <!-- <div class="topbtn">
        <div @click="godetial">点击查看提交记录</div>
      </div> -->
      <van-form>
        <van-field
          readonly
          clickable
          name="picker"
          :value="TestTime"
          label="接种时间"
          placeholder="点击选择接种时间"
          @click="TimeShow = true"
        />
        <van-popup v-model="TimeShow" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="SelectDate"
            @cancel="TimeShow = false"
          />
        </van-popup>

        <van-field
          v-model="structure"
          label="检测机构"
          placeholder="请输入检测机构"
          :rules="[{ required: true, message: '请填写检测机构' }]"
        />

        <van-field
          v-model="times"
          type="number"
          label="接种次数"
          placeholder="接种次数"
          :rules="[{ required: true, message: '请填写接种次数' }]"
        />
        <van-field
          v-model="vaacinInfo"
          label="接种信息"
          placeholder="请输入接种信息"
          :rules="[{ required: true, message: '请填写接种信息' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="submit"
            >提交信息</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      TestTime: "", //核酸检测时间
      TimeShow: false,
      structure: "", //检测机构
      vaacinInfo: " ", //接种信息
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      fileList: [],
      times: "", //接种次数
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push("/tab/home");
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    // 选择时间
    SelectDate(time) {
      const d = new Date(time);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this.TestTime = resDate;
      this.TimeShow = false;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    //图片上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    //提交信息
    async submit() {
      if (
        this.times != "" &&
        this.structure != "" &&
        this.TestTime != "" &&
        this.vaacinInfo != ""
      ) {
        const result = await this.$http.post(
          "/covid/vaccine-report/apply",
          {
            vaccinationDate: this.TestTime,
            vaccinationOrg: this.structure,
            vaccinationTimes: this.times,
            vaccineInfo: this.vaacinInfo,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (result.code == 200) {
           this.$router.push("/tab/home");
          Notify({ type: "success", message: "提交成功！" });
          // this.$router.push("/tab/home");
        } else {
          Notify({ type: "danger", message: "提交失效！" });
        }
      } else {
        Notify({ type: "warning", message: "信息不能为空！" });
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
.top {
  width: 100%;
  height: 100px;
  display: flex;
  .label {
    width: 30%;
    font-size: 14px;
    line-height: 100px;
    text-align: center;
  }
  .img {
    padding: 10px;
  }
}
.van-radio-group {
  padding-top: 20px;
}
.van-button {
  margin-top: 50px;
}
.topbtn {
  width: 100%;
  height: 40px;
  font-size: 14px;
  background: rgb(89, 206, 190);
  padding-top: 20px;
  div {
    width: 40%;
    padding: 3px;
    border-radius: 10px;
    margin: 0px auto;
    text-align: center;
    background: white;
    border: 1px solid rgb(219, 219, 219);
  }
}
</style>
