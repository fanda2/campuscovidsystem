<template>
  <div class="container">
    <van-nav-bar
      title="附近医院信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <div id="mapshow" class="appmap" :style="{height:`${sheight-50}px`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height:0,
    };
  },
  created()
  {
    this.sheight=window.screen.availHeight;
  },
  methods: {
    initMap() {
      // 定义地图中心点坐标
      var center = new window.TMap.LatLng(30.79589,103.90256);
      // 定义map变量，调用 TMap.Map() 构造函数创建地图
      var map = new window.TMap.Map(document.getElementById("mapshow"), {
        center: center, // 设置地图中心点坐标
        zoom: 17.2, // 设置地图缩放级别
        pitch: 43.5, // 设置俯仰角
        rotation: 45, // 设置地图旋转角度
      });
      console.log(map);
      console.log(window);
    },
    onClickLeft() {
      this.$router.push("/tab/home");
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="less" scoped>
.appmap {
  width: 100%;
}
</style>
