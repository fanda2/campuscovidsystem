<template>
  <div class="container">
    <van-nav-bar
      title="附近核酸监测点"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <div
        id="mapshow2"
        class="appmap"
        :style="{ height: `${sheight-50}px` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: "",
      sheight: 0,
    };
  },
  created() {
    this.sheight = window.screen.availHeight;
  },
  methods: {
    initMap() {
      // 定义地图中心点坐标
      var center = new window.TMap.LatLng(39.98412, 116.307484);
      // 定义map变量，调用 TMap.Map() 构造函数创建地图
      var map = new window.TMap.Map(document.getElementById("mapshow2"), {
        center: center, // 设置地图中心点坐标
        zoom: 17.2, // 设置地图缩放级别
        pitch: 43.5, // 设置俯仰角
        rotation: 45, // 设置地图旋转角度
      });
      // //绑定单击事件添加参数
      // new window.event.addListener(map, "click", function (event) {
      //   alert(
      //     "您点击的位置为: [" +
      //       event.latLng.getLat() +
      //       ", " +
      //       event.latLng.getLng() +
      //       "]"
      //   );
      // });
      console.log(map);
      console.log(window);
    },

    //地址搜索
    async getlocal() {
      if (this.words == "") {
        return this.$message.error("请输入查询地址信息");
      } else {
        var result = await this.$http.get("/map/tmapS", {
          params: {
            word: this.words,
          },
        });
        if (result.status == 200) {
          //用于展示
          this.form.address = result.data.row[0].title;
          //用于解析坐标
          this.detaillocation = result.data.row[0].address;
          this.longitude = result.data.row[0].location.lng;
          this.latitude = result.data.row[0].location.lat;
          this.location = result.data.row[0].address;
          this.$message({
            showClose: true,
            message: "查找成功！",
            type: "success",
          });
        } else {
          return this.$message.error("查找失败：", result.message);
        }
      }
    },
    onClickLeft() {
      this.$router.push("/tab/home");
    },
  },
  mounted() {
    this.initMap();
    // this.mapTX()
  },
};
</script>

<style lang="less" scoped>
.appmap {
  width: 100%;
}
</style>
