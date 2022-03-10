<template>
  <div class="content">
    <van-nav-bar
      title="行程记录上报"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <van-form @submit="onSubmit">
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

        <!-- <van-field
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
        </van-popup> -->
    
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交信息</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
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
      outstyle: ["铁路列车", "客运汽车", "飞机", "网约车", "自驾", "其他"],
      areaList,
      showArea: false,
      showArea2: false,
      showStyle: false,
    };
  },

  methods: {
    onClickLeft() {
      console.log("ddd");
      this.$router.push("/tab/home");
    },
    onSubmit(values) {
      console.log("submit", values);
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
