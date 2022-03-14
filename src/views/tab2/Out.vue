<template>
  <div class="content">
    <van-nav-bar
      title="外出申请填写"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <van-form>
        <van-field
          v-model="season"
          rows="1"
          autosize
          label="外出原因"
          type="textarea"
          maxlength="60"
          class="note"
          placeholder="请填写外出原因"
          show-word-limit
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="OutTime"
          label="外出时间"
          placeholder="点击选择外出时间"
          @click="dateshow = true"
        />
        <van-popup v-model="dateshow" position="bottom">
          <van-datetime-picker
            v-model="currentDate2"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="SelectDate"
            @cancel="dateshow = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="BackTime"
          label="返校时间"
          placeholder="点击选择预计返校时间"
          @click="dateBack = true"
        />
        <van-popup v-model="dateBack" position="bottom">
          <van-datetime-picker
            v-model="currentDate2"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="BackSchool"
            @cancel="dateBack = false"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="picker"
          :value="OutStyle"
          label="出行方式"
          placeholder="点击选择出行方式"
          @click="showStyle = true"
        />
        <van-popup v-model="showStyle" position="bottom">
          <van-picker
            show-toolbar
            :columns="outstyle"
            @confirm="onConfirm3"
            @cancel="showStyle = false"
          />
        </van-popup>
        <van-field
          v-model="number"
          name="车排号/车次/航班号"
          label="车排号/车次/航班号"
          placeholder="请输入车排号/车次/航班号"
        />
        <van-field name="radio" label="健康状态">
          <template #input>
            <van-radio-group v-model="health" direction="horizontal">
              <van-radio name="健康">健康</van-radio>
              <van-radio name="良好">良好</van-radio>
              <van-radio name="异常">异常</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px" v-if="outstatus === ''">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="submit"
            >提交申请</van-button
          >
        </div>
        <div class="auditing" style="margin: 16px" v-if="outstatus === 0">
          审核中
        </div>
        <div class="auditpass" style="margin: 16px" v-if="outstatus === 1">
          审核通过
        </div>
        <div class="auditout" style="margin: 16px" v-if="outstatus === 2">
          审核未通过
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { Notify } from "vant";
export default {
  data() {
    return {
      season: "", //返校原因
      OutTime: "", //外出时间
      BackTime: "", //返校时间
      OutStyle: "", //返校交通方式
      number: "", //车排号/车次/航班号
      health: "", //健康状态选择
      showPicker: false,
      minDate: new Date(),
      maxDate: new Date(2025, 1, 1),
      currentDate2: new Date(),
      outstyle: ["铁路列车", "客运汽车", "飞机", "网约车", "自驾", "其他"],
      Passage: ["南大门", "西大门", "彭州校区", "宜宾校区"],
      areaList,
      traffic: "",
      showArea: false,
      dateshow: false,
      showStyle: false,
      showPassage: false,
      dateBack: false,
      outstatus: "",
    };
  },
  created() {
    this.GetStatus();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/outview");
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    SelectDate(time) {
      const d = new Date(time);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this.OutTime = resDate;
      this.dateshow = false;
    },
    BackSchool(time) {
      const d = new Date(time);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this.BackTime = resDate;
      this.dateBack = false;
    },
    //提交申请信息
    async submit() {
      if (this.BackTime && this.OutStyle && this.season) {
        var result = await this.$http.post(
          "/out-school-apply/apply",
          {
            outSchoolBackDate: this.BackTime,
            outSchoolHealthStatus: this.health,
            outSchoolReason: this.season,
            outSchoolTransports: this.OutStyle,
          },
          {
            Headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (result.code == 200) {
          // 成功通知
          Notify({ type: "success", message: "提交成功" });
          this.GetStatus();
        } else {
          Notify({ type: "warning", message: "提交信息失败，请稍后重试！" });
        }
      } else {
        Notify({ type: "warning", message: "信息不能为空！" });
      }
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
        var databack = arr.outSchoolBackDate.split(" ")[0]  ;
        console.log( databack)
        var mydata = new Date();
        console.log()
        if ((databack.split('-')[0]>mydata.getFullYear())||(databack.split('-')[0]==mydata.getFullYear()&&databack.split("-")[1] >mydata.getMonth())||(databack.split('-')[0]==mydata.getFullYear()&&databack.split("-")[1]>=mydata.getMonth()&&databack.split('-')[2]>=mydata.getDay())) {
          this.outstatus = arr.outSchoolAuditStatus;
          this.BackTime = arr.outSchoolBackDate;
          this.health = arr.outSchoolHealthStatus;
          this.season = arr.outSchoolReason;
          this.OutStyle = arr.outSchoolTransports;
          this.OutTime="2022-2-22"
        }
      }
    },
    //显示函数
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
    //交通工具选择
    onConfirm3(value) {
      this.OutStyle = value;
      this.showStyle = false;
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
.van-radio-group {
  margin-top: 20px;
}
.van-button {
  margin-top: 20px;
}
.note {
  margin-top: 20px;
  height: 120px;
  line-height: 2 0px;
}
.auditing,
.auditpass,
.auditout {
  margin-left: 0px !important;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 4px;
  text-align: center;
}
.auditing {
  color: rgb(64, 185, 233);
}
.auditpass {
  color: rgb(18, 175, 18);
}
.auditout {
  color: red;
}
</style>
