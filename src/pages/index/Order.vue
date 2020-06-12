<template>
  <div>
    <el-card class="box-card">
      <!-- 查询部分 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="formInline.orderState" placeholder="订单状态">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
        <el-date-picker  v-model="value1" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 订单列表 -->
      <el-table :data="tableData" border style="width: 100%;margin-bottom: 20px;">
        <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="100"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="100"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="100"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          </template>
        </el-table-column>

      </el-table>
      <!-- 编辑的模态框 -->
      <el-dialog title="编辑订单信息" :visible.sync="dialogFormVisible4Edit">
        <el-form :model="editData">
          <el-form-item label="	订单id" :label-width="formLabelWidth">
            <el-input v-model="editData.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="editData.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="editData.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="editData.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="editData.consignee"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input v-model="editData.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input v-model="editData.orderTime"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="editData.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="editData.orderAmount"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input v-model="editData.orderState"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible4Edit = false">取 消</el-button>
          <el-button type="primary" @click="edit_btn">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看的模态框 -->
      <el-dialog title="查看订单信息" :visible.sync="dialogFormVisible4Detail">
        <el-form :model="detailData">
          <el-form-item label="订单数据对象" :label-width="formLabelWidth">
            <el-input v-model="detailData.cateName" disabled></el-input>
          </el-form-item>
          <el-form-item label="	订单id" :label-width="formLabelWidth">
            <el-input v-model="detailData.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="detailData.orderNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="detailData.orderTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="detailData.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="detailData.consignee" disabled></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input v-model="detailData.deliverAddress" disabled></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input v-model="detailData.deliveryTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="detailData.remarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="detailData.orderAmount" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input v-model="detailData.orderState" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible4Detail = false">取 消</el-button>
          <!-- dialogFormVisible4 = false -->
          <el-button type="primary" @click="dialogFormVisible4Detail = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页器:当前页码,每页条数-->
      <!--page-sizes:每页条数的数组,page-sizes:可以选择的每页显示的条数,page-size: 默认每页显示的条数,pager:当前页-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 15]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {
    API_ORDER_LIST,
    // API_ORDER_SEARCH,
    API_ORDER_DETAIL,
    API_ORDER_EDIT
  } from "@/api/apis";
  import moment from "moment";
  export default {
    data() {
      return {
        // 查看订单详情的数据列表
        detailData: [],
        // 编辑订单详情的数据列表
        editData: {},
        // 获取列表需要的 id
        detailId: 0,
        // 分页:动态每页显示条数
        pageSize: '5',
        // 分页:动态当前页,第几页
        currentPage: 1,
        // 总条数
        total: 0,
        // 模态框的显示与否
        dialogFormVisible4Edit: false,
        dialogFormVisible4Detail: false,
        formLabelWidth: '120px',
        pickerOptions: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        // 时间
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        formInline: {
          orderNo: '',
          consignee: '',
          phone: '',
          orderState: ''
        },
        // 列表的数据
        tableData: []
      };
    },
    methods: {
      // 查询 
      onSubmit() {
        // console.log('1',this.value1);
        API_ORDER_LIST(1, this.pageSize, this.formInline.orderNo, this.formInline.consignee, this
          .formInline.phone, this.formInline.orderState, this.value1).then(res => {
          this.tableData = res.data.data
          this.total = res.data.total
          // console.log(res.data.total);
          // this.orderList(this.currentPage)
        })
      },
      // 分页:动态每页显示条数
      handleSizeChange(val) {
        // console.log(`${val}`);
        this.pageSize = val; //动态改变
        // 请求列表
        // 改变之后应该停留在当前的页面
        this.orderList(this.currentPage)
        // console.log(this.pageSize);
      },
      // 分页:动态当前页,第几页
      handleCurrentChange(val) {
        // console.log(`${val}`);
        this.currentPage = val;
        // 请求列表
        this.orderList(this.currentPage)

        // this.orderList(this.currentPage)
        // console.log(this.currentPage);

      },
      //  获取列表
      orderList() {
        API_ORDER_LIST(this.currentPage, this.pageSize, this.formInline.orderNo, this.formInline.consignee, this
          .formInline.phone, this.formInline.orderState, this.value1).then(res => {
          // console.log('数据', res.data);
          this.tableData = res.data.data
          this.total = res.data.total
          this.tableData.forEach(v => {
            // console.log("v",v.deliveryTime);
            v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss")
            // console.log(v.deliveryTime);
            
            v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss")
          })

        })
      },
      // 查看模态框的显示和隐藏
      handleClick(row) {
        // console.log('查看', row.id);
        this.dialogFormVisible4Detail = true;
        // 发送请求
        API_ORDER_DETAIL(row.id).then(res => {
          this.detailData = res.data.data
          // console.log('请求的数据',res.data.data);
        })
      },
      // 编辑模态框的显示与隐藏
      handleEdit(index, row) {
        console.log('编辑', row);
        // 显示模态框
        this.dialogFormVisible4Edit = true;
        // 复制给 form
        this.editData = row;
        console.log(this.editData);
      },
      // 编辑信息,发送请求
      edit_btn() {

        // 	String	是	下单时间
        // 	String	是	电话
        // 	String	是	收货人
        // 	String	是	送货地址
        // String	是	送达时间
        // 	String	是	备注
        // 	String	是	订单金额
        // 	String	是	订单状态
        API_ORDER_EDIT(this.editData.id, this.editData.orderNo, this.editData.orderTime, this.editData.phone, this
          .editData.consignee, this.editData.deliverAddress, this.editData.deliveryTime, this.editData.remarks, this
          .editData.orderAmount, this.editData.orderState).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            //   // 隐藏模态框
            this.dialogFormVisible4Edit = false;
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
      // 获取列表
      this.orderList(this.currentPage)
    },
  };
</script>

<style lang="less" scoped>
  .box-card {
    margin: 20px;
  }
</style>