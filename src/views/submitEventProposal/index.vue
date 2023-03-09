<template>
  <div class="submitEvent-container" style="margin: 10% 30%;border:1px solid #000">
    <el-form ref="form" :model="form" label-width="120px" style="margin-top: 10px;margin-left:30px">
      <el-alert
        title="Submit Event Proposal"
        type="info"
        center
        style="width:200px;margin: 10px 29%"
        :closable="false"
      />
      <el-form-item label="Activity name" style="width: 420px;">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone" style="width: 300px;">
          <el-option label="shanghai" value="shanghai" />
          <el-option label="beijing" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11" style="width: 60%;">
          <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" style="width: 300px;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.desc" type="textarea" style="width: 300px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">log out</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Submit',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date: '',
        desc: '',
        applyname: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var applyname = this.$route.query.username
      this.axios.post('http://43.143.203.160:8080/event/', 'title=' + this.form.name + '&detail=' + this.form.desc + '&zone=' + this.form.region + '&time=' + this.form.date + '&applyname=' + applyname).then(res => {
        console.log(res.data)
      })
      this.$message('submit!')
    },
    async onCancel() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

