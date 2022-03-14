<template>
  <div class="content">
    <van-nav-bar
      title="活动申请详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form" v-for="(item, index) in detiallist" :key="index">
      <div class="item pass" v-if="item.schoolActivityAuditStatus == 1">
        <div class="basemsg">
          <span>{{ item.schoolActivityDate }}</span
          ><span style="padding-left: 40px"
            >{{ item.schoolActivityHeadcount }}人</span
          ><span style="margin-left: 30px">审核通过</span>
        </div>
        <div><span>活动内容：</span>{{ item.schoolActivityContent }}</div>
        <div><span>活动地点：</span>{{ item.schoolActivityPlace }}</div>
      </div>
      <div class="item out" v-if="item.schoolActivityAuditStatus == 2">
        <div class="basemsg">
          <span>{{ item.schoolActivityDate }}</span
          ><span style="padding-left: 40px"
            >{{ item.schoolActivityHeadcount }}人</span
          ><span style="margin-left: 30px">审核不通过</span>
        </div>
        <div><span>活动内容：</span>{{ item.schoolActivityContent }}</div>
        <div><span>活动地点：</span>{{ item.schoolActivityPlace }}</div>
      </div>
      <div class="item audit" v-if="item.schoolActivityAuditStatus == 0">
        <div class="basemsg">
          <span>{{ item.schoolActivityDate }}</span
          ><span style="padding-left: 40px"
            >{{ item.schoolActivityHeadcount }}人</span
          ><span style="margin-left: 30px">审核中</span>
        </div>
        <div><span>活动内容：</span>{{ item.schoolActivityContent }}</div>
        <div><span>活动地点：</span>{{ item.schoolActivityPlace }}</div>
      </div>
    </div>
    <div class="nomsg" v-if="count == 0 || count == null">
      暂时没有提交数据记录
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      detiallist: [], //个人详情
      pagesize: 100,
      pagenum: 1,
      backroute: this.$route.params.backroute,
      count: 0, //数据总数
    };
  },
  created() {
    console.log("加载");
    this.ActGet();
  },
  methods: {
    //获取个人活动申请提交记录
    async ActGet() {
      const result = await this.$http.get(
        "/school-activity-apply/getSchoolActivityList",
        {
          params: {
            page: this.pagenum,
            size: this.pagesize,
          },
        }
      );
      if (result.code == 200) {
        this.detiallist = result.data.list;
        this.count = result.data.totalCount;
        console.log("wwww", this.count);
      } else {
        Notify({ type: "warning", message: "查询信息，请稍后重试！" });
      }
    },
    onClickLeft() {
      if (this.backroute == 1) {
        this.$router.push("/Activity");
      } else {
        this.$router.push("/tab/myinfo");
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
.note {
  margin-top: 20px;
  height: 120px;
  line-height: 20px;
}
.nomsg {
  width: 100%;
  height: 200px;
    line-height: 200px;
  font-size: 16px;
  text-align: center;
}
.van-button {
  margin-top: 40px;
}
.item {
  padding: 10px;
  width: 90%;
  margin: 10px auto;
  border-radius: 5px;
  // background: paleturquoise;
  box-shadow: 3px 3px 3px rgb(226, 226, 226);
  font-size: 16px;
  .basemsg {
    height: 30px;
  }
  div {
    width: 98%;
    margin: 6px auto;
  }
}
.pass {
  background: rgb(89, 230, 108);
}
.out {
  background: orange;
}
.audit {
  background: rgba(78, 164, 245, 0.671);
}
</style>
