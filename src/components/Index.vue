<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="180px" style="background-color: rgb(238, 241, 246)">
      <el-row class="tac">
        <el-col :span="12">
          <h5>ES 小工具</h5>
          <el-menu
            default-active="this.$route.path" router
            class="el-menu-vertical-demo">
            <el-menu-item index="/indexinfo">
              <i class="el-icon-menu"></i>
              <span>索引信息</span>
            </el-menu-item>
            <el-menu-item index="/dataconfig">
              <i class="el-icon-document"></i>
              <span>数据配置</span>
            </el-menu-item>
            <el-menu-item index="/schedule">
              <i class="el-icon-setting"></i>
              <span>定时任务</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-container >
      <el-header style="text-align: right; font-size: 12px" >

      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: darkseagreen;
  text-color: "#fff";
  active-text-color: "#ffd04b";
  /*background-color: #B3C0D1;*/
  /*color: #333;*/
  /*line-height: 60px;*/
}

.el-aside {
  color: #42b983;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 179px;
  min-height: 400px;
  height: 100%;
}
</style>

<script>
export default {

};
</script>
