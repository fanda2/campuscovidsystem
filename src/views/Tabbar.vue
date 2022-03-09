<template>
  <div>
      <router-view></router-view>
    <div>
    <van-tabbar v-model="active" route>
  <van-tabbar-item replace to="/tab/home" name="home" icon="home-o">主页</van-tabbar-item>
  <van-tabbar-item replace to="/tab/myinfo" name="myinfo" icon="setting-o">我的</van-tabbar-item>

</van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        active:'home'
    };
  },
};
</script>

<style lang="less" scoped></style>
