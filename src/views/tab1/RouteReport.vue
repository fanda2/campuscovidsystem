<template>
  <div class="content">
    <van-nav-bar
      title="行程记录上报"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topbtn">
      <div @click="godetial">点击查看提交记录</div>
    </div>
    <div class="form">
      <van-form>
        <van-field
          readonly
          clickable
          name="area"
          :value="startaddress"
          label="出发地区"
          placeholder="点击选择出发地区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm2"
            @cancel="showArea = false"
          />
        </van-popup>
        <van-field
          v-model="detailaddress"
          label="具体出发地点"
          placeholder="请输入具体出发地点"
          :rules="[{ required: true, message: '请填写具体出发地点' }]"
        />
        <van-field
          readonly
          clickable
          name="area"
          :value="arriveaddress"
          label="到达地区"
          placeholder="点击选择到达地区"
          @click="showArea2 = true"
        />
        <van-popup v-model="showArea2" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea2 = false"
          />
        </van-popup>

        <van-field
          v-model="detailarrive"
          name="具体出发地点"
          label="具体出发地点"
          placeholder="请输入具体出发地点"
          :rules="[{ required: true, message: '请填写具体出发地点' }]"
        />
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
          :rules="[{ required: true, message: '请填写车排号/车次/航班号' }]"
        />
        <van-field
          v-model="SetNum"
          name="座位号"
          label="座位号"
          placeholder="请输入座位号"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="OutTime"
          label="行程时间"
          placeholder="点击选择行程时间"
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
          v-model="note"
          rows="1"
          autosize
          label="备注"
          type="textarea"
          maxlength="60"
          class="note"
          placeholder="请填写备注"
          show-word-limit
        />
        <div class="bottomnote">
          <span>请务必根据真实情况进行填写，并且承担相应的责任</span>
        </div>

        <div class="bottombtn">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="Route"
            >提交信息</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { Notify } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      result: 1, //表示选择的值
      startaddress: "", //出发地区
      detailaddress: "", //具体出发地区
      arriveaddress: "", //到达地区
      detailarrive: "", //具体到达地点
      OutStyle: "", // 出行方式选择
      number: "", //车排号/车次/航班号
      SetNum: "", //座位号
      note: "", //添加备注内容
      outstyle: ["铁路列车", "客运汽车", "飞机", "网约车", "自驾", "其他"],
      areaList,
      showArea: false,
      showArea2: false,
      showStyle: false,
      dateshow: false,
      OutTime: "",
      minDate: new Date(),
      maxDate: new Date(2025, 1, 1),
      currentDate2: new Date(),
      loginstatus:sessionStorage.getItem('status')
    };
  },
  created() {
    this.teststatus();
  },
  methods: {
    teststatus() {
      if (this.loginstatus == 0 ||this.loginstatus==null) {
        Dialog.confirm({
          title: "提示",
          message: "现在还未登录，是否跳转到登录界面。",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$router.push("/tab/home");
          });
      }
    },
    //行程报告提交
    async Route() {
      const result = await this.$http.post(
        "/trip-report/insert",
        {
          arrivalArea: this.arriveaddress,
          startingArea: this.startaddress,
          note: this.note,
          number: this.number,
          seatNumber: this.SetNum,
          specificDepartureArea: this.detailaddress,
          specificDestinationArea: this.detailarrive,
          startingWay: this.OutStyle,
          tourDate: this.OutTime,
        },
        {
          headers: {
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
    },
    onClickLeft() {
      this.$router.push("/tab/home");
    },
    onConfirm(values) {
      this.arriveaddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea2 = false;
    },
    onConfirm2(values) {
      this.startaddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    onConfirm3(value) {
      this.OutStyle = value;
      this.showStyle = false;
    },
    //时间格式化函数
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
    //进入查看详情页
    godetial() {
      this.$router.push({ name: "routedet", params: { backroute: 1 } });
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
.bottombtn {
  height: 100px;
  width: 90%;
  margin: 0 auto;
}
.bottomnote {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 12px;
  color: rgb(221, 221, 221);
}
</style>
