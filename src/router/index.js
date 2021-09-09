import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import DataConfig from "../components/DataConfig";
import Schedule from "../components/Schedule";
import IndexInfo from "../components/IndexInfo";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'indexinfo',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'IndexInfo',
          component: IndexInfo
        },
        {
          path: 'dataconfig',
          name: 'DataConfig',
          component: DataConfig
        },
        {
          path: 'schedule',
          name: 'Schedule',
          component: Schedule
        }
      ]
    }
  ]
})
