<template>
  <el-container style="height: 900px; border: 1px solid #eee">

    <el-header>用户登录</el-header>

    <el-container style="height: 0px; border: 1px">
      <el-aside>文件名</el-aside>
      <el-main>
        <el-input placeholder="存放在本机的文件名"
                  v-model='fileName'
                  clearable>
        </el-input>

        <el-button style="margin-top: 12px;"
                   @click="Login">登录</el-button>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
export default {
  name: "registerlogin",
  data() {
    return {
      fileName: '',
    }
  },
  watch: {},
  route: {},
  computed: {
  },
  created() {},
  components: {
  },
  filters: {},
  methods: {
    Login() {
      // func.Post(api.login, { userName: this.userName, password: this.password }, res => {
      //   if (res.status === 202) {
      //     this.logining = true;
      //     Toast("登录成功");
      //     this.$router.push({
      //       name: "Main"
      //     });
      //   } else {
      //     Toast("登录失败\n" + res.data.errorMsg);
      //     // this.password = "";
      //   }
      // });
      this.$message('登录成功');
        this.$router.push({
            name: "Main",
            params: {
              fileName: this.fileName,
            },
          });
    },
  },
  onShow() {},
  beforeDestroy() {}
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 80px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>