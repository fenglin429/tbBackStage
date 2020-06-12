<template>
  <el-card class="box-card">
   
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button style="float: right;" type="primary" @click='save_btn'>保存</el-button>
      </div>
      <div style="width: 600px;">
      <div>
        <!-- //         : "1590473180839.webp"
  // : (2) ["1970-01-01 08:00:00", "1970-01-01 22:30:00"]
  
  // : (2) ["单人精彩套餐", "VC无限橙果汁全场8折"] -->
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input type="textarea" v-model="form.bulletin"></el-input>
          </el-form-item>

          <el-form-item label="店铺头像">
            <el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:5000/shop/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="url" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
            <!-- <div class="demo-fit">
              <div class="block">
                <el-avatar shape="square" :size="100" :src="url"></el-avatar>
              </div>
            </div> -->
          </el-form-item>
          <el-form-item label="店铺图片">
            <el-upload action="http://127.0.0.1:5000/shop/upload" 
            list-type="picture-card"
             :file-list='fileList'
              :on-success="handleAvatarSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input v-model="form.deliveryPrice"></el-input>
          </el-form-item>
          <el-form-item label="起送价格">
            <el-input v-model="form.minPrice"></el-input>
          </el-form-item>
          <el-form-item label="送达时间">
            <el-input v-model="form.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.sellCount"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="在线支付满28减5"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-picker format='hh 时 mm 分 ss 秒' value-format='yyyy-MM-dd hh:mm:ss' is-range v-model="form.date"
              range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
        </el-form>
      </div>

    </div>
   
  </el-card>
</template>

<script>
  import {
    API_SHOP_INFO,
    API_SHOP_EDIT
    
  } from "@/api/apis";
  export default {
    data() {
      return {
        // 店铺图片渲染
        dialogImageUrl: '',
        dialogVisible: false,
        // 店铺头像
        url: '',
        file: '',
        // 
        fileList: [],
        picUrl: 'http://127.0.0.1:5000/upload/shop/',
        value1: '',
        delivery: false,
        resource: "",
        desc: "",
        imageUrl: "",
        labelPosition: "right",
        form: {
          name: "",
          region: "",
          price: "",
          grade: "",
          sales: "",
          // 店铺头像的渲染数组
          pics: [],
          supports: []

          // date1: "",
          // date2: ""
        }
      };
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      //店铺图片上传成功的函数
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.pics.push(res.imgUrl)
        console.log('成功的回调函数', this.pics);
        console.log('路径', this.imageUrl);
      },
      // 文件删除时的钩子
      handleRemove(file, fileList) {
        this.pics = fileList
        console.log('删除时候的钩子1', file);
        console.log('删除时候的钩子', fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 点击保存的时候发送修改的请求
      save_btn() {
        let newData={...this.form};
        newData.supports=JSON.stringify(newData.supports),
        newData.date=JSON.stringify(newData.date),
        newData.pics=JSON.stringify(this.pics)
        API_SHOP_EDIT(newData).then(res => {
          console.log(res);
          console.log(res);
          if (res.data.code == '0') {
            this.$message({
              showClose: true,
              message: "编辑成功~",
              type: "success"
            });
          }
        })
      }

    },

    created() {
      API_SHOP_INFO().then(res => {
        // <span>
        //         <el-image style="width: 100px; height: 100px"
        //           :src="''+props.row.imgUrl"></el-image>
        //       </span>
        this.form = res.data.data
        this.url = 'http://127.0.0.1:5000/upload/shop/' + this.form.avatar
        this.pics = res.data.data.pics
        // console.log('增加前', this.fileList);
        // 遍历店铺图片
        this.fileList = this.pics.map(i => {
          return {
            url: this.picUrl + i
          }
        })
        // this.pics.forEach(i => {
        //   // this.list.push(this.picUrl+i)
        //   // this.picUrl+i
        //   // 对象

        //   let divide = {
        //     url: this.picUrl + i
        //   }
        //   // 追加到数组
        //   this.fileList.push(divide)
        //   // console.log(this.picUrl+i);
        // });
        // console.log('hou', this.fileList);

      })
    },
  };
</script>

<style scoped>
  .el-input__inner {
    width: 400px !important;

  }
 
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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

  .el-button--primary {
    padding-bottom: 8px;
  }
</style>