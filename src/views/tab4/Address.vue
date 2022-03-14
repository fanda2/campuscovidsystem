<template>
  <div class="contnet">
    <van-nav-bar
      title="风险地区查询"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <iframe
      src="http://bmfw.www.gov.cn/yqfxdjcx/risk.html"
      frameborder="0"
      scrolling:no
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      console.log("ddd");
      this.$router.push("/tab/home");
    },
  },
};
</script>

<style lang="less" scoped>
.contnet {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
