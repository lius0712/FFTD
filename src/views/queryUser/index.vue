<template>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.eid }}
          </template>
        </el-table-column>
        <el-table-column label="UserName">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Email">
          <template slot-scope="scope">
            {{ scope.row.detail }}
          </template>
        </el-table-column>
        <el-table-column label="Sex">
          <template slot-scope="scope">
            {{ scope.row.zone }}
          </template>
        </el-table-column>
        <el-table-column label="Time">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="Role" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.applyname }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.status===0" type="warning">Failed</el-tag>
            <el-tag size="mini" v-else-if="scope.row.status===1" type="success">Pass</el-tag>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </template>
  <script>
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: [],
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        this.axios.get('http://43.143.203.160:8080/event').then(res => {
          this.list = res.data
          this.listLoading = false
          console.log(res.data)
        })
      },
      overrule() {
        this.axios.patch('http://43.143.203.160:8080/event', 'status=' + 0).then(res => {
          console.log(res.data)
        }).catch(err => {
          console.log(err)
        })
      },
      pass() {
        this.axios.patch('http://43.143.203.160:8080/event', 'status=' + 1).then(res => {
          console.log(res.data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
  </script>
  