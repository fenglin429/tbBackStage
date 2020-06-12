<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="原密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label=" 新密码">
        <el-input v-model="form.pwd1"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="form.pwd2"></el-input>
      </el-form-item>
      <el-button @click="affirm_btn" :plain="true">确认</el-button>
      <el-button type="primary">重置</el-button>
    </el-form>
  </el-card>
</template>

<script>
// @click="cancel_btn" Editpwd
// 修改密码
// 检测旧密码
import { API_CHECKOLDPWD ,API_EDITPWD } from "@/api/apis";
export default {
  data() {
    return {
      form: {
        pwd1: "",
        pwd: "",
        pwd2: ""
      }
    };
  },
  methods: {
    // 检测旧密码
    affirm_btn() {
      if (this.form.pwd1 != this.form.pwd2) {
           this.$message.error('错了哦,两次密码不一致哦~');
        return;
      }
      let id = window.localStorage.user_id;
      // console.log(id)
     API_CHECKOLDPWD  (this.form.pwd, id).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          API_EDITPWD(this.form.pwd1, id).then(res => {
            // console.log(res);
            // 说明修改成功了
            if (res.data.code == 0) {
                this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success"
              });
              // 1.清除本地存储,2.跳转到登录页面
              window.localStorage.removeItem("user_id");
              // 跳转
              setTimeout(() => {
                  this.$router.push("/");
              }, 3000);
            
            }
          });
        }
      });
      // console.log(1)
    }
  }
};
</script>

<style lang="less" scoped>
</style>