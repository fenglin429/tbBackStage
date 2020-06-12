<template>
  <el-card class="box-card">
    <p class="list">商品列表</p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category}}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>
                <el-image style="width: 100px; height: 100px"
                  :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+props.row.imgUrl"></el-image>
              </span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime}}</span>
            </el-form-item>
            <el-form-item label="商品评论">
              <span>{{ props.row.rating}}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount}}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="商品名称" prop="name">
      </el-table-column>
      <el-table-column label="所属分类" prop="category">
      </el-table-column>
      <el-table-column label="商品价格" prop="price">
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px"
            :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+scope.row.imgUrl"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- 编辑的模态框 -->
          <el-dialog title="编辑商品信息" :visible.sync="dialogFormVisible4Edit">
            <el-form :model="rowTableData">
              <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="rowTableData.name"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-input v-model="rowTableData.category"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="rowTableData.price"></el-input>
              </el-form-item>
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload action="http://127.0.0.1:5000/goods/goods_img_upload" list-type="picture-card"
                  :on-success="handleAvatarSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <!-- <el-input v-model="rowTableData.imgUrl"></el-input> -->
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input v-model="rowTableData.goodsDesc"></el-input>
              </el-form-item>

              <!-- form.userGroup -->
            </el-form>
            <!-- <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in list" :key="item.list" :label="item.label" :value="item.cateName">
                    </el-option>
                  </el-select>
                </template> -->

            <!-- <el-image style="width: 100px; height: 100px"
                  :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+scope.row.imgUrl"></el-image> -->

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible4Edit = false">取 消</el-button>
              <el-button type="primary" @click='affirmEdit_btn'>确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器:当前页码,每页条数-->
    <!--page-sizes:每页条数的数组,page-sizes:可以选择的每页显示的条数,page-size: 默认每页显示的条数,pager:当前页-->
    <el-pagination width='40px' @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[5, 10, 15]" :page-size="5"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  // 获取删除添加
  import {
    API_GOODS_LIST,
    API_GOODS_DEL,
    API_GOODS_EDIT
  } from "@/api/apis";
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        formLabelWidth: '200px',
        // 第几页
        currentPage: 1,
        pageSize: 5,
        // 模态框的显示
        dialogFormVisible4Edit: false,
        // 总条数
        total: 0,
        //完整路径
        full: '',
        // 图片当前的路径
        image: '',
        tableData: [],
        rowTableData: []
      }
    },
    methods: {
      // 分页:动态每页显示条数
      handleSizeChange(val) {
        // console.log(`${val}`);
        this.pageSize = val; //动态改变
        // console.log(  this.pageSize );
        this.acquire_list()


        // 改变之后应该停留在当前的页面
        // this.refresh(this.currentPage)
      },
      // 分页:动态当前页,第几页
      handleCurrentChange(val) {
        // console.log(`${val}`);
        //动态改变:每页多少条
        this.currentPage = val;
        // console.log( this.currentPage);
        this.acquire_list()


        // this.refresh(this.currentPage)

      },
      // 编辑模态框
      handleEdit(index, row) {
        // console.log('当前行的数据:',row);
        // 显示模态框
        this.dialogFormVisible4Edit = true;
        // 复制给 form
        this.rowTableData = row
        // console.log(row);

        // console.log('复制的当前行数据:',this.form);
        // 当前行原来的状态  ===>模态框的状态 
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API_GOODS_DEL(row.id).then(res => {
            if (res.data.code == 0) {
              // 重新渲染
              this.acquire_list()
              this.$message({
                showClose: true,
                message: "删除成功~",
                type: "success"
              });
            }
          });
        })
        // console.log(row.id);
      },
      // 获取列表
      acquire_list() {
        API_GOODS_LIST(this.currentPage, this.pageSize).then(res => {
          // console.log(res.data.data);
          // 总条数
          this.total = res.data.total;
          // 数据
          this.tableData = res.data.data;
          // for(let i of this.tableData ){
          //   i.imgUrlFull=i.imgUrl
          //   // console.log(i.imgUrlFull);
          // }
          // this.imgUrl=res.data.data;
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        // console.log(this.dialogImageUrl);

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleAvatarSuccess(res) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(this.imagUrl);
        this.image = res.imgUrl;
        console.log(this.image);



      },

      // 编辑
      affirmEdit_btn() {
        //         name	String	是	商品名称
        // category	String	是	商品分类
        // price	String	是	商品价格
        // imgUrl	String	是	商品图片地址
        // goodsDesc	String	是	商品描述
        // id	int	是	商品ID
        API_GOODS_EDIT(this.rowTableData.name, this.rowTableData.category, this.rowTableData.price, this.image, this
          .rowTableData.goodsDesc, this.rowTableData.id).then(res => {
          // console.log(res);
          if (res.data.code == 0) {
            //   // 隐藏模态框
            this.dialogFormVisible4Edit = false;
            this.$message({
              showClose: true,
              message: "编辑成功~",
              type: "success"
            });
            this.acquire_list(this.currentPage)

          }
        })
      },


    },
    created() {
      this.acquire_list()
    },
  };
</script>

<style lang="less">
  .box-card {
    .list {
      width: 100%;
      line-height: 40px;
      border-bottom: 1px solid #ccc;

    }

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .el-input__inner {
      width: 100px;
    }
  }
</style>