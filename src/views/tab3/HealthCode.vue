<template>
  <div class="content">
    <van-nav-bar
      title="健康码状态上报"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <div class="top">
        <div class="label">健康码信息上传</div>
        <div class="img">
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            :max-count="1"
          />
        </div>
      </div>
      <van-form>
        <van-field
          readonly
          clickable
          name="picker"
          :value="TestTime"
          label="健康码时间"
          placeholder="点击选择时间"
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

        <van-field name="radio" label="检测结果">
          <template #input>
            <van-radio-group v-model="testresult" direction="horizontal">
              <van-radio name="绿码">绿码</van-radio>
              <van-radio name="黄码">黄码</van-radio>
              <van-radio name="红码">红码</van-radio>
            </van-radio-group>
          </template>
        </van-field>
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
      testresult: " ", //检测结果
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      fileList: [],
      testPic: "",
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
    // 图片上传
    afterRead(file) {
      console.log(file);
      this.upload();
    },
    async upload() {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("files", this.fileList[0].file); //接口需要传的参数
      var result = await this.$http.post("/common/upload", formData);
      if (result.code == 200) {
        this.testPic = result.data[0];
        Notify({ type: "success", message: "图片上传成功！" });
      }
    },
    //提交信息
    async submit() {
      if (
        this.testPic != "" &&
        this.TestTime != "" &&
        this.testresult != null
      ) {
        const result = await this.$http.post(
          "/covid/health-code/apply",
          {
            healthCodeDate: this.TestTime,
            healthCodePic: this.testPic,
            healthCodeStatus: this.testresult,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (result.code == 200) {
          this.$router.push("/tab/home");
          Notify({ type: "success", message: "提交成功！" });
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
</style>
