<template>
  <div>
    <el-card class="box-card">
      <p class="list">商品添加</p>
      <div></div>
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="商品名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in list" :key="item.list" :label="item.label" :value="item.cateName">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number class="price" v-model="num" @change="handleChange" :min="1" :max="100" label="描述文字">
          </el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload action="http://127.0.0.1:5000/goods/goods_img_upload" list-type="picture-card"
            :on-success="handleAvatarSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="formLabelAlign.info"></el-input>
        </el-form-item>
        <el-button type="primary" @click='add_Btn' :plain="true">添加商品</el-button>
      </el-form>
      
    </el-card>
  </div>
</template>

<script>
  import {
    API_GOODS_CATEGORIES,
    API_GOODS_ADD
  } from "@/api/apis";
  export default {
    data() {
      return {
        // 图片地址
        image: '',
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: '',
        list: [],
        value: '',
        // 价格
        num: 1,
        formLabelAlign: {
          name: "",
          region: "",
          type: '',
          img: '',
          info: ''
        },

      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(value) {
        this.num = value
      },
      handleAvatarSuccess(res) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(this.imagUrl);
        this.image = res.imgUrl;
        // console.log(this.image);



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

      // name	String	是	商品名称
      // category	String	是	商品分类
      // price	String	是	商品价格
      // imgUrl	String	是	商品图片地址
      // goodsDesc	String	是	商品描述
      // API_GOODS_ADD (this.image).then(res=>{

      // })
      // 点击添加商品,发送请求
      add_Btn() {
        // console.log(this.formLabelAlign.info);
        // console.log(1);
        API_GOODS_ADD(this.formLabelAlign.name, this.value, this.num, this.image, this.formLabelAlign.info).then(
          res => {
            // console.log(res);
            if (res.data.code == 0) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              // 刷新清空表格
            }
          })
      },
    
    },
    created() {
      API_GOODS_CATEGORIES().then(res => {
        this.list = res.data.categories
        // console.log(this.list);
      })
    },
  };
</script>

<style lang="less" scoped>
  .box-card {

    .list+div {
      margin: 20px;
    }

    .price {
      width: 400px;
    }

    .el-input__inner {
    width: 400px !important;


    }
    .el-input__inner{
  }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
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

  }
</style>