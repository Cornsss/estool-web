<template>
  <div class="hello">
<!--    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="健康值"
        prop="health">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
      </el-table-column>
      <el-table-column
        label="索引名称"
        prop="index">
      </el-table-column>
<!--      <el-table-column
        label="uuid"
        prop="uuid">
      </el-table-column>-->
      <el-table-column
        label="存储空间"
        width="90%"
        prop="priStoreSize">
      </el-table-column>
      <el-table-column
        label="文档数量"
        width="90%"
        prop="docsCount">
      </el-table-column>
      <el-table-column
        align="left">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleViewMapping(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            @click="handleConfig(scope.$index, scope.row)">配置</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="索引mapping信息"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
<!--      <span> <pre>{{ mapping | json}} </pre> </span>-->
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="数据项配置"
      :visible.sync="dialogVisibleConfig">
      <div>
        <el-form :model="configForm" ref="configForm" >
          <el-row v-for="(item, idx) in configForm.GetSysoConfig" :key="idx">
            <span style="text-align: left">{{ item.field }}</span>
            <el-input v-model="item.type" />
            <el-input v-model="item.config" />
          </el-row>
        </el-form>
        <div style="margin-left: 150px">
          <el-button type="warning" @click="dialogVisibleConfig = false">关 闭</el-button>
          <el-button type="primary" @click="updateConfig()">确 定</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'IndexInfo',
  data () {
    return {
      tableData: [],
      search: '',
      dialogVisible: false,
      dialogVisibleConfig: false,
      mapping: '',
      configForm: {
        GetSysoConfig: []
      }
    }
  },
  methods: {
    // 获取索引列表信息
    getIndexList(){
      this.getRequest("/es/getIndex").then(resp=>{
        if(resp.code == "1"){
          this.tableData = resp.data;
        }else {
          this.$message.error('索引列表获取执行异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('索引列表获取执行异常,原因:'+resp.message);
      });
    },
    handleViewMapping(index, row) {
      this.getRequest("/es/getIndexTextMapping/"+row.index).then(resp=>{
        if(resp.code == "1"){
          this.dialogVisible = true;
          this.mapping = resp.data;
        }else {
          this.$message.error('查看索引mapping信息异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('查看索引mapping信息异常,原因:'+resp.message);
      });
    },
    handleConfig(index, row) {
      this.getRequest("/es/getIndexSubMapping/"+row.index).then(resp=>{
        if(resp.code == "1"){
          this.configForm.GetSysoConfig = resp.data;
          console.log(resp.data)
          this.dialogVisibleConfig = true;
        }else {
          this.$message.error('查看索引mapping信息异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('查看索引mapping信息异常,原因:'+resp.message);
      });
    },
    handleDelete(index, row) {
      this.postRequest("/es/deleteIndex",row.indexName).then(resp=>{
        if(resp.code == "1"){
          this.tableData = resp.data;
        }else {
          this.$message.error('删除索引异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('删除索引异常,原因:'+resp.message);
      });
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    updateConfig(){
      this.postRequest("/config/addDataConfig",this.configForm.GetSysoConfig).then(resp=>{
        if(resp.code == "1"){
          this.dialogVisibleConfig = false;
          this.$message({
            message: "索引的数据项配置成功",
            type: 'success'
          });
        }else {
          this.$message.error('配置异常,原因:'+resp.message);
        }
      }).catch(err => {
        this.$message.error('配置异常,原因:'+resp.message);
      });
    }
  },
  created() {
    this.getIndexList();
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
