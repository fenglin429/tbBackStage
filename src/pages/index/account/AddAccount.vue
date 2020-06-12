<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加账户</span>
    </div>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="账号">
        <el-input v-model="form.name" value></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd" value></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="form.region" placeholder="请选择用户组">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-button :plain="true" @click="clickadd_btn">添加</el-button>
      <el-button @click="clickreset_btn" type="primary">重置</el-button>
    </el-form>
  </el-card>
</template>

<script>
import { API_ADD } from "@/api/apis";

export default {
  data() {
    return {
      form: {
        name: "",
        pwd: "",
        region: ""
      },
      flag: true
    };
  },
  methods: {
    clickadd_btn() {
      // 标记为 false 不继续执行
      if (this.flag == false) return;
      this.flag = false;
      // 发送请求
      API_ADD(this.form.name, this.form.pwd, this.form.region).then(res => {
        if (res.data.code == 0) {
          (this.form.pwd = ""), (this.form.name = ""), (this.form.region = "");
          this.$message({
            showClose: true,
            message: "恭喜您,添加成功~",
            type: "success"
          });
          
        } else {
          this.$message({
            showClose: true,
            message: " 输入错误~",
            type: "warning"
          });
        }
      });
      // 3 秒后可以重新发送请求
      setTimeout(() => {
        this.flag = true;
      }, 3000);
    },
    clickreset_btn() {
      (this.form.pwd = ""), (this.form.name = ""), (this.form.region = "");
    }
  }
};
</script>

<style lang="less" scoped>
</style>