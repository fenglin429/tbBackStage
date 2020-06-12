<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账号列表</span>
    </div>
    <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%;" :data="tableData"
      @selection-change="handleSelectionChange">
      <!-- 设置列名  width:宽 type="selection" :多选框 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" width="120"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
      <el-table-column prop="ctime" label="创建时间"></el-table-column>
      <!-- 按钮  tableData -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="form.userGroup" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" :plain="true" @click="edit_btn">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" :plain="true" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器:当前页码,每页条数-->
    <!--page-sizes:每页条数的数组,page-sizes:可以选择的每页显示的条数,page-size:每页显示的条数,pager:当前页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10]"
      :page-size="5" layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
    <!-- 按钮-->
    <div style="margin-top: 20px;">
      <el-button type="danger" @click="batch_bth">批量删除</el-button>
      <el-button @click="cancel_btn" type="primary">取消选择</el-button>
    </div>
  </el-card>
</template>

<script>
  // 添加列表 // 删除// 编辑 // 批量删除
  import {
    API_LIST,
    API_DEl,
    API_EDIT,
    API_BATCHDEL
    
  } from "@/api/apis";

  export default {
    // 数据
    data() {
      return {
        account: "",
        tableData: [],
        currentPage: 1, //默认显示第一页
        pageSize: 5, //默认每页显示5条
        multipleSelection: [],
        total: 0,
        id: 0,
        // 编辑框的显示和隐藏
        flag: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        // 批量删除id 数组
        idArr: [],
        form: {
          account: "",
          userGroup: ""
        },
        formLabelWidth: "120px"
      };
    },
    // 方法
    methods: {
      // 刷新用户列表函数
      refresh() {
        API_LIST(this.currentPage, this.pageSize).then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          // console.log(res);
        });

      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 分页:动态每页显示条数
      handleSizeChange(val) {
        // console.log(`${val}`);
        this.pageSize = val; //动态改变
        // 改变之后应该停留在当前的页面
        this.refresh(this.currentPage)
      },
      // 分页:动态当前页,第几页
      handleCurrentChange(val) {
        // console.log(`${val}`);
        //动态改变:每页多少条
        this.currentPage = val;
        this.refresh(this.currentPage)

      },
      // 选中
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // 数组对象
        // console.log( this.multipleSelection )
        for (let obj in this.multipleSelection) {
          // console.log(this.multipleSelection[obj].id)
          this.idArr.push(this.multipleSelection[obj].id);
        }
      },

      //  取消选择
      cancel_btn() {
        this.$refs.multipleTable.clearSelection();
      },
      // 编辑模态框
      handleEdit(index, row) {
        // console.log(row);
        // 显示模态框
        this.dialogFormVisible = true;
        // 复制给 form
        this.form = row;
      },
      // 编辑
      // dialogFormVisible = false
      edit_btn() {
        // console.log(this.form);
        API_EDIT(this.form.id, this.form.account, this.form.userGroup).then(res => {
          // console.log(res);
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "编辑成功~",
              type: "success"
            });
            // 隐藏模态框
            this.dialogFormVisible = false;
          }
        });
      },
      // 删除
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API_DEl(row.id).then(res => {
            if (res.data.code == 0) {
              // 重新渲染
              this.refresh(this.currentPage)
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
      // 批量删除
      batch_bth() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(JSON.stringify(this.idArr))
          API_BATCHDEL(JSON.stringify(this.idArr)).then(res => {
            // console.log(res);
            if (res.data.code == 0) {
              this.refresh(this.currentPage)
              this.$message({
                showClose: true,
                message: "删除成功~",
                type: "success"
              });
            }
          });
        })

      }
    },
    // 页面加载完毕的时候加载列表
    created() {
      // console.log('请求的参数',this.currentPage);
      this.refresh()
    }
  };
</script>

<style lang="less">
  .el-pagination .el-select .el-input .el-input__inner {
    padding-right: 25px;
    border-radius: 3px;
    width: 100px;
  }
</style>