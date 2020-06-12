<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>管理员信息</span>
    </div>
    <ul>
      <li>
        管理员 ID :
        <span>{{personal.id}}</span>
      </li>
      <li>
        账号 :
        <span>{{personal.account}}</span>
      </li>
      <li>
        用户组 :
        <span>{{personal.userGroup}}</span>
      </li>
      <li>
        创建时间 :
        <span>{{personal.ctime}}</span>
      </li>
      <li>
        管理员头像 :
        <!-- <img :src="personal.imgUrl" alt /> 
        action:上传的位置
        -->
        <el-upload class="avatar-uploader" action="http://127.0.0.1:5000/users/avatar_upload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :data='data' :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </li>
    </ul>
  </el-card>
</template>

<script>
  import {
    API_ACCOUNTINFO
  } from "@/api/apis";
  // , API_AVATAR_UPLOAD 

  export default {
    data() {
      return {
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        personal: {},
        // file: {}
        data: {
          id: localStorage.user_id
        }
      };
    },
    methods: {
      handleAvatarSuccess() {
        // this.accountinfo()

        // this.imageUrl = URL.createObjectURL(file.raw);
        window.location.reload()



      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      accountinfo() {
        let id = window.localStorage.user_id;
        API_ACCOUNTINFO(id).then(res => {
          // console.log(res.data.accountInfo)
          this.personal = res.data.accountInfo;
        });

      }
    },
    created() {
      this.accountinfo()

    },
  };
</script>

<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  ul,
  li {
    list-style: none;
    line-height: 40px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 90%;
  }
</style>