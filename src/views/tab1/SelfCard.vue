<template>
  <div class="content">
    <van-nav-bar
      title="自诊打卡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form">
      <van-form error-message-align="right">
        <van-field name="radio" label="当前健康状况">
          <template #input>
            <van-radio-group v-model="bodyStatus" direction="horizontal">
              <van-radio name="正常">正常</van-radio>
              <van-radio name="确诊">确诊</van-radio>
              <van-radio name="发热（普通感冒）">发热（普通感冒）</van-radio>
              <van-radio name="发热（未知）">发热（未知）</van-radio>
              <van-radio name="疑似（未隔离）">疑似（未隔离）</van-radio>
              <van-radio name="疑似（已隔离）">疑似（已隔离）</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="checkboxGroup" label="出现症状">
          <template #input>
            <van-checkbox-group v-model="symptom" direction="horizontal">
              <van-checkbox name="咽痛" shape="square">咽痛</van-checkbox>
              <van-checkbox name="发热" shape="square">发热</van-checkbox>
              <van-checkbox name="乏力" shape="square">乏力</van-checkbox>
              <van-checkbox name="干咳" shape="square">干咳</van-checkbox>
              <van-checkbox name="恶心" shape="square">恶心</van-checkbox>
              <van-checkbox name="呕吐" shape="square">呕吐</van-checkbox>
              <van-checkbox name="无" shape="square">无</van-checkbox>
              <van-checkbox name="流涕" shape="square"> 流涕</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field name="radio" label="当前密切">
          <template #input>
            <van-radio-group v-model="closePeople" direction="horizontal">
              <van-radio name="正常">正常</van-radio>
              <van-radio name="确诊">确诊</van-radio>
              <van-radio name="发热（普通感冒）">发热（普通感冒）</van-radio>
              <van-radio name="发热（未知）">发热（未知）</van-radio>
              <van-radio name="疑似（未隔离）">疑似（未隔离）</van-radio>
              <van-radio name="疑似（已隔离）">疑似（已隔离）</van-radio>
            </van-radio-group>
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
            <van-radio-group v-model="atschool" direction="horizontal">
              <van-radio name="在校">在校</van-radio>
              <van-radio name="不在校">不在校</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="是否正在实习">
          <template #input>
            <van-radio-group v-model="practive" direction="horizontal">
              <van-radio name="未实习">未实习</van-radio>
              <van-radio name="实习（四川省成都市）"
                >实习（四川省成都市）</van-radio
              >
              <van-radio name="实习（四川其他州市）"
                >实习（四川其他州市）</van-radio
              >
              <van-radio name="实习（湖北省）">实习（湖北省）</van-radio>
              <van-radio name="实习（浙江省）">实习（浙江省）</van-radio>
              <van-radio name="实习（广东省）">实习（广东省）</van-radio>
              <van-radio name="实习（河南省）">实习（河南省）</van-radio>
              <van-radio name="实习（湖南省）">实习（湖南省）</van-radio>
              <van-radio name="实习（其他省市）">实习（其他省市）</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="居住地风险程度">
          <template #input>
            <van-radio-group v-model="risk" direction="horizontal">
              <van-radio name="低风险地区">低风险地区</van-radio>
              <van-radio name="中风险地区">中风险地区</van-radio>
              <van-radio name="高风险地区">高风险地区</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="colock"
            >确认</van-button
          >
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
      result: 1, //表示选择的值
      checked1: 0,
      checked2: 0,
      groupChecked: [],
      showPicker: false,
      valueaddress: "", //获取到的地点值
      practive: "", //是否正在实习
      risk: "", //风险登记
      showArea: false,
      areaList,
      atschool: "", //是否在校
      symptom: [], //症状
      bodyStatus: "", //现在症状
      closePeople: "", //秘接人群情况
      // 数据格式见 Area 组件文档
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push("/Calendar");
    },
    onConfirm2(values) {
      this.valueaddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    //自诊打卡
    async colock() {
      if(this.bodyStatus!=""&&this.closePeople!=""&&this.valueaddress!=" "&&this.risk!=" "&&this.practive!=""&&this.atschool!=""&&this.symptom!="")
      {
          const result = await this.$http.post("/clock-in/insertClock", 
      {
          bodyStatus: this.bodyStatus,
          closePeople: this.closePeople,
          currentLocation: this.valueaddress,
          currentResidenceRiskLevel: this.risk,
          isInInternship: this.practive,
          isInSchool: this.atschool,
          symptom: String(this.symptom),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.code == 200) {
        // 成功通知
        Notify({ type: "success", message: "打卡成功" });
         this.$router.push('/Calendar')
      } else {
        Notify({ type: "warning", message: "打卡失败，请重试！" });
      }
      }else{
         Notify({ type: "warning", message: "表单信息不能为空！" });
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

.van-button {
  margin-top: 40px;
}
.van-radio-group {
  display: flex;
  justify-content: space-between;
}
.van-radio {
  margin: 3px;
}
.van-checkbox-group {
  display: flex;
  justify-content: space-between;
}
.van-checkbox {
  margin: 5px;
}
</style>
