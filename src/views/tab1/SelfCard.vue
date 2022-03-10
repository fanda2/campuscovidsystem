<template>
  <div class="content">
    <van-nav-bar
      title="自诊打卡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <van-form @submit="onSubmit" error-message-align="right" >
        <van-field name="radio" label="当前健康状况">
          <template #input>
            <van-radio-group v-model="checked1" direction="horizontal">
              <van-radio name="1">正常</van-radio>
               <van-radio name="2">确诊</van-radio>
              <van-radio name="3">发热（普通感冒）</van-radio>
              <van-radio name="4">发热（未知）</van-radio>
              <van-radio name="5">疑似（未隔离）</van-radio>
              <van-radio name="6">疑似（已隔离）</van-radio>
             
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="checkboxGroup" label="出现症状">
          <template #input>
            <van-checkbox-group v-model="groupChecked" direction="horizontal">
              <van-checkbox name="1" shape="square">咽痛</van-checkbox>
              <van-checkbox name="2" shape="square">发热</van-checkbox>
              <van-checkbox name="3" shape="square">乏力</van-checkbox>
              <van-checkbox name="4" shape="square">干咳</van-checkbox>
              <van-checkbox name="5" shape="square">恶心</van-checkbox>
              <van-checkbox name="6" shape="square">呕吐</van-checkbox>
              <van-checkbox name="7" shape="square">无</van-checkbox>
              <van-checkbox name="8" shape="square"> 流涕</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="area"
          :value="valueaddress"
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm2"
            @cancel="showArea = false"
          />
        </van-popup>
        <van-field name="radio" label="是否在校">
          <template #input>
            <van-radio-group v-model="checked2" direction="horizontal">
              <van-radio name="1">在校</van-radio>
              <van-radio name="2">不在校</van-radio>
            </van-radio-group>
          </template>
        </van-field>
           <van-field name="radio" label="是否正在实习">
          <template #input>
            <van-radio-group v-model="practive" direction="horizontal">
              <van-radio name="1">未实习</van-radio>
              <van-radio name="2">实习（四川省成都市）</van-radio>
              <van-radio name="3">实习（四川其他州市）</van-radio>
              <van-radio name="4">实习（湖北省）</van-radio>
              <van-radio name="5">实习（浙江省）</van-radio>
              <van-radio name="6">实习（广东省）</van-radio>
               <van-radio name="7">实习（河南省）</van-radio>
              <van-radio name="8">实习（湖南省）</van-radio>
              <van-radio name="9">实习（其他省市）</van-radio>
            </van-radio-group>
          </template>
        </van-field>
         <van-field name="radio" label="居住地风险程度">
          <template #input>
            <van-radio-group v-model="risk" direction="horizontal">
              <van-radio name="1">低风险地区</van-radio>
              <van-radio name="2">中风险地区</van-radio>
              <van-radio name="3">高风险地区</van-radio>

            </van-radio-group>
          </template>
        </van-field>

        <van-field
          v-model="code"
          name="验证码"
          label="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
    
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >确认</van-button
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
      studentNum: "",
      username: "",
      phoneNum: "",
      code: "",
      pwd1: "",
      pwd2: "",
      value: "学生",
      result: 1, //表示选择的值
      columns: [
        { text: "学生", value: 1 },
        { text: "教职工", value: 0 },
      ],
      checked1: 0,
      checked2: 0,
      groupChecked: [],
      showPicker: false,
      valueaddress: "",  //获取到的地点值
      practive:'',//是否正在实习
      risk:'', //风险登记
      showArea: false,
      areaList,

      // 数据格式见 Area 组件文档
    };
  },

  methods: {
    onClickLeft() {
      console.log("ddd");
      this.$router.push("/Calendar");
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onConfirm(value) {
      this.value = value.text;
      this.result = value.value;
      this.showPicker = false;
    },
    onConfirm2(values) {
      this.valueaddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
}

.van-button {
  margin-top: 20px;
}
.van-radio-group{
    display: flex;
     justify-content: space-between;
}
.van-radio{
    margin: 3px;
}
.van-checkbox-group{
    display: flex;
    justify-content: space-between;
}
.van-checkbox{
    margin: 5px;
}
</style>
