<template>
  <div class="register-container">
    <article class="header">
      <header>
        <el-avatar icon="el-icon-user-solid" shape="circle" />
        <span class="login">
          <em class="bold">Already have an account？</em>
          <a href="">
            <el-button type="primary" size="mini" @click="onCancel">Sing in</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        autocomplete="off"
        hide-required-asterisk="true"
        size="medium"
      >
        <div style="padding-top: 10px">
          <el-form-item label="Name" prop="Nameemail">
            <el-col :span="10">
              <el-input
                v-model="ruleForm.name"
                placeholder="Enter your Name"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Email" prop="Email">
            <el-col :span="10">
              <el-input
                v-model="ruleForm.email"
                placeholder="Enter your email address"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Password" prop="pwd">
            <el-col :span="10">
              <el-input v-model="ruleForm.pwd" type="password" />
            </el-col>
          </el-form-item>
          <el-form-item label="Confirm Pwd" prop="cpwd">
            <el-col :span="10">
              <el-input v-model="ruleForm.cpwd" type="password" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 40%"
              @click="register"
            >Register</el-button>
          </el-form-item>
        </div>
      </el-form>
    </section>

    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      statusMsg: '',
      error: '',
      isDisable: false,
      codeLoading: false,
      ruleForm: {
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        email: [{
          required: true,
          type: 'email',
          message: 'Please enter your email address',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          type: 'string',
          message: '请输入验证码',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: 'Input Password',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: 'Confirm Passwrod',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]

      }
    }
  },
  methods: {
    // 用户注册
    register: function() {
      this.axios.post('http://43.143.203.160:8080/user/', 'username=' + this.ruleForm.name + '&password=' + this.ruleForm.pwd + '&status=' + 0).then(res => {
        this.$message({
                  showClose: true,
                  message: "register successfully！",
                  type: "success",
                });
        //this.$router.push('/login')
        //console.log(res.data)
      })
    },
    async onCancel() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 95%;

    input {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    label {
      font-style: normal;
      font-size: 12px;
      color: $light_gray;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .header {
    border-bottom: 2px solid rgb(235, 232, 232);
    min-width: 980px;
    color: #666;

    header {
      margin: 0 auto;
      padding: 10px 0;
      width: 980px;

      .login {
        float: right;
      }

      .bold {
        font-style: normal;
        color: $light_gray;
      }
    }
  }

  > section {
    margin: 0 auto 30px;
    padding-top: 30px;
    width: 980px;
    min-height: 300px;
    padding-right: 100px;
    box-sizing: border-box;

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }

    .error {
      color: red;
    }
  }

  .tips {
    float: right;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>

<!-- <style scoped>
/* 修改验证器样式 */
/deep/ .el-form-item.is-error .el-input__inner {
  border-color: #889aa4;
}
/deep/ .el-form-item.is-error .el-input__validateIcon {
  color: #889aa4;
}
/deep/ .el-form-item__error {
  color: #e6a23c;
}
</style> -->

