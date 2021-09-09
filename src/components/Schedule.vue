<template>
  <div class="hello">
<!--    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="id"
        width="40%"
        prop="jobId">
      </el-table-column>
      <el-table-column
        label="类名"
        prop="beanName">
      </el-table-column>
      <el-table-column
        label="表达式"
        prop="cronExpression">
      </el-table-column>
      <el-table-column
        width="80%"
        label="是否暂停"
        prop="isPause">
      </el-table-column>
      <el-table-column
        label="任务名称"
        prop="jobName">
      </el-table-column>
      <el-table-column
        label="方法名"
        width="70%"
        prop="methodName">
      </el-table-column>
      <el-table-column
        label="参数"
        prop="params">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="description">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
<!--          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>-->
        </template>
        <template slot-scope="scope">

          <el-button
            type="primary"
            size="mini"
            @click="handleExecute(scope.$index, scope.row)">执行</el-button>
          <el-button type="success" size="mini">暂停</el-button>
          <el-button type="warning" size="mini">修改</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  data () {
    return {
      tableData: []
    }
  },
  created() {
    this.getSchedule();
  },
  methods: {
    getSchedule() {
      this.getRequest("/quartz/querySchedule").then(resp=>{
        if(resp.code == "1"){
          this.tableData = resp.data;
        }else {
          this.$message.error('任务列表获取执行异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('任务列表获取执行异常,原因:'+resp.message);
      });
    },
    handleExecute(index, row){
      this.getRequest("/quartz/execution/"+row.jobId).then(resp=>{
        if(resp.code == "1"){
          this.$message({
            message: "{"+row.jobName +'}任务执行成功！',
            type: 'success'
          });
        }else {
          this.$message.error('任务执行异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('任务执行异常,原因:'+resp.message);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
