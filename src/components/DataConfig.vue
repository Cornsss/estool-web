<template>
  <div class="hello">
<!--    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="字段名"
        prop="field">
      </el-table-column>
      <el-table-column
        label="字段类型"
        prop="type">
      </el-table-column>
      <el-table-column
        label="配置项"
        prop="config">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
<!--          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>-->
          <el-select v-model="value" placeholder="Select">
            <el-option
              v-for="item in indexs"
              :key="item.indexName"
              :label="item.indexName"
              :value="item.indexName">
            </el-option>
          </el-select>
        </template>
<!--        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
&lt;!&ndash;          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>&ndash;&gt;
        </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DataConfig',
  data () {
    return {
      tableData: [],
      indexs: [],
      value: ''
    }
  },
  created() {
    this.getDataConfig();
    this.getGroupName();
  },
  methods: {
    getDataConfig(){
      this.getRequest("/config/queryDataConfig").then(resp=>{
        if(resp.code == "1"){
          this.tableData = resp.data;
        }else {
          this.$message.error('系统列表获取执行异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('系统列表获取执行异常,原因:'+resp.message);
      });
    },
    getGroupName() {
      this.getRequest("/config/queryDataConfigGroup").then(resp=>{
        if(resp.code == "1"){
          this.indexs = resp.data;
        }else {
          this.$message.error('系统列表获取执行异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('系统列表获取执行异常,原因:'+resp.message);
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
