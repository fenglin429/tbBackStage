<template>
  <div class="login-div">
    <el-card class="box-card">
      <h4>天霸餐饮管理系统</h4>
      <el-input v-model="input_user" placeholder="请输入管理员账号"></el-input>
      <el-input class="pwd-input" v-model="input_pwd" placeholder="请输入密码"></el-input>
      <el-button @click="clickLogin" type="primary" class="btn">登录</el-button>
    </el-card>
  </div>
</template>

<script>
  import {
    API_CHECKLOGIN
  } from "@/api/apis";
  export default {
    components: {
      // index
    },
    data() {
      return {
        input_user: "",
        input_pwd: "",
        flag: true
      };
    },
    methods: {
      clickLogin() {
        // console.log(1)
        // 点击登录按钮,如果标记为 false 的话不继续执行
        if (this.flag == false) return;
        // 发送请求,将标记变为 false
        this.flag = false;
        API_CHECKLOGIN(this.input_user, this.input_pwd).then((res) => {
          // console.log(res.data.code);
          // 登录成功
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "恭喜您,登录成功~",
              type: "success"
            });
            // 跳转到首页
            this.$router.push("/index/home");
            //把 id  token  用户名存储到本地
            // console.log(res.data.id)
            // window.localStorage.setItem('user_id',res.data.id)
            localStorage.user_id = res.data.id;
            localStorage.user_name = this.input_user;
            localStorage.token = res.data.token;
            localStorage.role = res.data.role;
            // 错误的话
          } else {
            this.$message({
              showClose: true,
              message: " 用户名或者密码错误~",
              type: "warning"
            });
          }
        });
        // 3 秒内只能发送一次请求,3 秒之后将标记置为 true
        setTimeout(() => {
          this.flag = true;
        }, 3000);
      }
    }
  };
</script>

<style lang="less" scoped>
  @base: #2d3a4b;
  
  .login-div {
    width: 100%;
    height: 100%;
    background: url(../assets/imgs/tim.jpeg);
    /* background-color: @base; */
    display: flex;
    justify-content: center;
    align-items: center;
  
    .box-card {
      width: 400px;
      text-align: center;
  
      h4{
          color: @base;
          margin: 16px 0;
      }
  
      .pwd-input {
        margin-top: 16px;
      }
      .btn {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
  </style>