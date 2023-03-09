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
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Description">
        <template slot-scope="scope">
          {{ scope.row.detail }}
        </template>
      </el-table-column>
      <el-table-column label="Zone">
        <template slot-scope="scope">
          {{ scope.row.zone }}
        </template>
      </el-table-column>
      <el-table-column label="Time">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="Organizer" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.applyname }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Evaluate" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" icon="el-icon-error" circle @click="overrule(scope.row.title)"></el-button>
          <el-button type="success" size="mini" icon="el-icon-success" circle @click="pass(scope.row.title)"></el-button>
        </template>
      </el-table-column>
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
    overrule(title_value) {
      this.axios.put('http://43.143.203.160:8080/event/', 'title=' + title_value + '&status=' + 0).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    pass(title_value) {
      this.axios.put('http://43.143.203.160:8080/event/', 'title=' + title_value + '&status=' + 1).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
