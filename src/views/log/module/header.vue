<template>
  <div class="head-container">
    <el-input v-model="query.username" clearable placeholder="用户名" style="width: 200px;" class="filter-item" size="small" @keyup.enter.native="toQuery"/>
    <el-date-picker v-model="query.daterange" :picker-options="pickerOptions2" class="filter-item" style="width: 370px;" size="small" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"/>
    <el-button class="filter-item" size="small" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
