<template>
  <div class="content">
    <van-nav-bar
      title="校内活动申请填写"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topbtn">
      <div @click="godetial">点击查看申请记录</div>
    </div>
    <div class="form">
      <van-form>
        <van-field
          v-model="season"
          rows="1"
          autosize
          label="申请原因"
          type="textarea"
          maxlength="60"
          class="note"
          placeholder="请填写申请活动原因"
          show-word-limit
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="ApplyTime"
          label="开始时间"
          placeholder="点击选择活动开始时间"
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
        <van-field v-model="number" type="digit" label="请输入活动人数" />
        <van-field
          v-model="actArea"
          label="活动地点"
          placeholder="请输入活动地点"
          :rules="[{ required: true, message: '请填写活动地点' }]"
        />

        <van-field name="radio" label="健康状态">
          <template #input>
            <van-radio-group v-model="health" direction="horizontal">
              <van-radio name="1">健康</van-radio>
              <van-radio name="2">良好</van-radio>
              <van-radio name="3">异常</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="bottom">
          <span>坚持履行谁举办谁负责的原则</span>
        </div>
        <div style="margin: 16px" v-if="Actstatus === ''">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="subActivity"
            >提交申请</van-button
          >
        </div>
        <div class="auditing" style="margin: 16px" v-if="Actstatus === 0">
          审核中
        </div>
        <div class="auditpass" style="margin: 16px" v-if="Actstatus === 1">
          审核通过
        </div>
        <div class="auditout" style="margin: 16px" v-if="Actstatus === 2">
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
      season: "", //活动内容原因
      ApplyTime: "", //活动时间时间
      Applynum: "", //结束时间时间
      actArea: "", //活动地点
      number: "", //活动人数
      health: "", //健康状态选择
      showPicker: false,
      minDate: new Date(),
      maxDate: new Date(2025, 1, 1),
      currentDate2: new Date(),
      areaList,
      traffic: "",
      showArea: false,
      dateshow: false,
      dateBack: false,
      Actstatus: "",
    };
  },

  methods: {
    //提交校内活动申请
    async subActivity() {
      if (this.season && this.ApplyTime && this.number) {
        var result = await this.$http.post(
          "/school-activity-apply/apply",
          {
            schoolActivityContent: this.season,
            schoolActivityDate: this.ApplyTime,
            schoolActivityHeadcount: this.number,
            schoolActivityPlace: this.actArea,
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
          this.$router.push("/tab/home");
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
        var arr = result.data.list[0];
        this.outstatus = arr.outSchoolAuditStatus;
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
      this.ApplyTime = resDate;
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
    //进入活动申请查看页面
    godetial() {
        this.$router.push({ name: "activitydet", params: { backroute: 1 } });
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
.bottom {
  width: 100%;
  height: 70px;
  line-height: 70px;
  font-size: 14px;
  color: rgb(172, 172, 172);
  text-align: center;
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
