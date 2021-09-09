<template>
  <div id="app">
    <div style="margin-bottom: 10px;">
      <el-input placeholder="格式：127.0.0.12:9200" v-model="host">
        <template slot="prepend">Http://</template>
        <el-button slot="append" @click="connectEs">连接</el-button>
      </el-input>
<!--      <h3>{{ message }}</h3>-->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      tableData: [],
      search: '',
      host: ''
    }
  },
  methods: {
    // 连接es
    connectEs() {
      this.postRequest("/es/connectEs/127.0.0.1/9200").then(resp=>{
        if(resp.code == "1"){
          // this.options = resp.obj.optionsAdd;
          alert(resp.data)
        }else {
          this.$message.error('es连接异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('es连接异常,原因:'+resp.message);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
