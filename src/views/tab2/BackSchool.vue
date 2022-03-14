<template>
  <div class="content">
    <van-nav-bar
      title="返校申请填写"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <van-form :readonly="backSchoolAuditStatus != ''">
        <van-field
          v-model="season"
          rows="1"
          autosize
          label="返校原因"
          type="textarea"
          maxlength="60"
          class="note"
          placeholder="请填写返校原因"
          show-word-limit
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="OutTime"
          label="行程时间"
          placeholder="点击选择行程时间"
          @click="outtime"
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
          name="area"
          :value="startaddress"
          label="出发地点"
          placeholder="点击选择出发地点"
          @click="getArea"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm2"
            @cancel="showArea = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="OutStyle"
          label="出行方式"
          placeholder="点击选择出行方式"
          @click="Showstyle"
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

        <van-field
          readonly
          clickable
          name="picker"
          :value="schoolPassage"
          label="进校通道选择"
          placeholder="点击选择进校通道"
          @click="showPassage = true"
        />
        <van-popup v-model="showPassage" position="bottom">
          <van-picker
            show-toolbar
            :columns="Passage"
            @confirm="mpassage"
            @cancel="showPassage = false"
          />
        </van-popup>
        <van-field name="radio" label="健康状态">
          <template #input>
            <van-radio-group v-model="health" direction="horizontal">
              <van-radio name="健康">健康</van-radio>
              <van-radio name="良好">良好</van-radio>
              <van-radio name="异常">异常</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px" v-if="backSchoolAuditStatus === ''">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="subBack"
            >提交申请</van-button
          >
        </div>
        <div
          class="auditing"
          style="margin: 16px"
          v-if="backSchoolAuditStatus === 0"
        >
          审核中
        </div>
        <div
          class="auditpass"
          style="margin: 16px"
          v-if="backSchoolAuditStatus === 1"
        >
          审核通过
        </div>
        <div
          class="auditout"
          style="margin: 16px"
          v-if="backSchoolAuditStatus === 2"
        >
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
      time: "", //用户选择时间
      season: "", //返校原因
      startaddress: "", //出发地区
      OutTime: "", //返校时间
      OutStyle: "", //返校交通方式
      number: "", //车排号/车次/航班号
      schoolPassage: "", //返校通道
      health: "", //健康状态选择
      backSchoolAuditStatus: "", //返校申请状态
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
    };
  },
  created() {
    this.GetStatus();
  },
  methods: {
    //返校申请提交
    async subBack() {
      const result = await this.$http.post(
        "/back-school-apply/insertBackSchoolApply",
        {
          backSchoolDate: this.OutTime,
          backSchoolEntrance: this.schoolPassage,
          backSchoolHealthStatus: this.health,
          backSchoolReason: this.season,
          backSchoolStartAddress: this.startaddress,
          backSchoolTransports: this.OutStyle,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.code == 200) {
        // 成功通知
        this.GetStatus();
        Notify({ type: "success", message: "提交成功" });
      } else {
        Notify({ type: "warning", message: "提交信息失败，请稍后重试！" });
      }
    },
    // 获取用户返校申请状态
    async GetStatus() {
      // 参数格式化
      var result = await this.$http.get(
        "/back-school-apply/getOverCurrentTimeApply"
      );
      if (result.code == 200 && result.data != null) {
        this.backSchoolAuditStatus = result.data.backSchoolAuditStatus;
        const value = result.data;
        this.OutTime = value.backSchoolDate;
        this.schoolPassage = value.backSchoolEntrance;
        this.health = value.backSchoolHealthStatus;
        this.season = value.backSchoolReason;
        this.startaddress = value.backSchoolStartAddress;
        this.OutStyle = value.backSchoolTransports;
      }
    },
    onClickLeft() {
      this.$router.push("/tab/home");
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
      this.OutTime = resDate + " 00:00:00";
      this.dateshow = false;
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
    onConfirm2(values) {
      this.startaddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    //交通工具选择
    onConfirm3(value) {
      this.OutStyle = value;
      this.showStyle = false;
    },
    //进校通道
    mpassage(value) {
      this.schoolPassage = value;
      this.showPassage = false;
    },
    //是否展示时间选择
    outtime() {
      if (this.backSchoolAuditStatus == "") {
        this.dateshow = true;
      }
    },
    //是否展示日期选择
    getArea() {
      if (this.backSchoolAuditStatus == "") {
        this.showArea = true;
      }
    },
    Showstyle() {
      if (this.backSchoolAuditStatus == "") {
        this.showStyle = true;
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
.van-radio-group {
  margin-top: 20px;
}
.van-button {
  margin-top: 20px;
}
.note {
  margin-top: 20px;
  height: 120px;
  line-height: 20px;
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
