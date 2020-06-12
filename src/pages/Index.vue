<template>
  <el-container>
    <el-aside width="200px">
   
      <h5>外卖管理系统</h5>
      <!-- default-active:当前选中的激活的菜单 -->
      <!--unique-opened:只可以展开一个菜单 -->
      <el-menu router unique-opened :default-active="this.$route.path" class="el-menu-vertical-demo"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <!--右侧树菜单-->
        <div v-for="item in  newlist" :key="item.index">
          <!--可以展开的带二级路由-->
          <el-submenu v-if="item.children" :index="item.index">
            <!-- 一级路由 -->
            <span slot="title">
              <i :class="item.icls"></i>
              {{item.title}}
            </span>
            <!-- 二级 -->
            <el-menu-item v-for="itemTwo in  item.children" :key="itemTwo.index" :index="itemTwo.index">
              <span slot="title">{{itemTwo.title}}</span>
            </el-menu-item>
          </el-submenu>
          <!-- 不可展开的只有一级路由 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.icls"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="line-height:60px" router>
        <!-- 面包屑-->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in  breadcrumb" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <p class="name">
            欢迎您,{{name}}
          </p>
          <el-dropdown>
            <!-- shape="square" :size="size"  :src="personal.imgUrl"-->
            <el-avatar :src='img_url'></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                  <router-link to='/index/personal'>个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to='/'>退出登录</router-link>
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 二级路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import { API_ACCOUNTINFO,API_CHECKTOKEN } from "@/api/apis";
  export default {
    data() {
      return {
        img_url: '',
        // 用户的权限
        role:'',
        // treelist:左侧树形菜单动态数据
        // index:要跳转的hash
        // icls:树形选项卡前面的图标
        // title:名字
        // children:一级菜单下面的二级菜单,有children
        treelist: [
          // <!-- 1.后台首页 -->
          {
            index: "/index/home",
            icls: "el-icon-s-home",
            title: "后台首页",
            role:['super','normal']
          },
          // <!-- 2.订单管理 -->

          {
            index: "/index/order",
            icls: "el-icon-document-remove",
            title: "订单管理",
            role:['super','normal']

          },
          // <!-- 3.商品管理 -->
          {
            index: "3",
            icls: "el-icon-s-goods",
            title: "商品管理",
            role:['super','normal'],
            children: [{
                index: "/index/list",
                title: "商品列表"
              },
              {
                index: "/index/goodsAdd",
                title: "商品添加"
              },
              {
                index: "/index/classify",
                title: "商品分类"
              }
            ]
          },
          // <!-- 4.店铺管理 -->
          {
            index: "/index/shops",
            icls: "el-icon-s-shop",
            title: "店铺管理",
            role:['super'],

          },
          //   <!-- 5.账号管理 -->

          {
            index: "/index/personal",
            icls: "el-icon-s-custom",
            title: "账号管理",
            role:['super'],

            children: [{
                index: "/index/accountlist",
                title: "账号列表"
              },
              {
                index: "/index/addaccount",
                title: "添加账户"
              },
              {
                index: "/index/change",
                title: "修改密码"
              }
            ]
          },
          // <!-- 6.销售统计 -->
          {
            index: "6",
            icls: "el-icon-pie-chart",
            title: "销售统计",
            role:['super'],
            children: [{
                index: "/index/commodity",
                title: "商品统计"
              },
              {
                index: "/index/indent",
                title: "订单统计"
              }
            ]
          }
        ],
        // 面包屑
        breadcrumb: ["首页"],
        // 激活
        defaultActive: ""
      };
    },
    //监听数据的变化
    watch: {
      // 监听路由
      $route: {
        // val:路由数据
        handler: function (val) {
          // console.log()
          this.changebreadlist(val.path);
          // console.log(window._indexthis)
        }
      },
      // 深度监听
      deep: true
    },
    methods: {
      // 面包屑函数
      changebreadlist(val) {
        // console.log(val.path);
        switch (val) {
          case "/index/home":
            this.breadcrumb = ["首页"];
            break;
          case "/index/personal":
            this.breadcrumb = ["首页", "个人中心"];
            break;
          case "/index/order":
            this.breadcrumb = ["订单管理"];
            break;
          case "/index/list":
            this.breadcrumb = ["商品管理", "商品列表"];
            break;
          case "/index/goodsAdd":
            this.breadcrumb = ["商品管理", "商品添加"];
            break;
          case "/index/classify":
            this.breadcrumb = ["商品管理", "商品分类"];
            break;
          case "/index/shops":
            this.breadcrumb = ["店铺管理"];
            break;
          case "/index/accountlist":
            this.breadcrumb = ["账号管理", "账号列表"];
            break;
          case "/index/addaccount":
            this.breadcrumb = ["账号管理", "添加账户"];
            break;

          case "/index/change":
            this.breadcrumb = ["账号管理", "修改密码"];
            break;

          case "/index/commodity":
            this.breadcrumb = ["销售统计", "商品统计"];
            break;
          case "/index/indent":
            this.breadcrumb = ["销售统计", "订单统计"];
            break;
        }
      },

    },
    computed: {
      newlist(){
        return this.treelist.filter(item=> item.role.includes(this.role))
      }
    },

    created() {
      // this.$route.path;
      // console.log(this.$route.path);
      // 在页面加载后,获取当前的 hash,当前的 hash
      //确定 this 的指向
      window._indexthis = this;
      // 面包屑
      this.changebreadlist(this.$route.path);
      // 获取用户名,id,token
      this.name = window.localStorage.user_name;
      this.id = window.localStorage.user_id;
      this.token = window.localStorage.token;
      this.role=localStorage.role;
      // console.log(this.role);
      // 获取头像
      API_ACCOUNTINFO(this.id).then(res => {
        this.img_url = res.data.accountInfo.imgUrl
        // this.personal = res.data.accountInfo;
        // console.log(this.img_url);
      });
      // 验证 token
      API_CHECKTOKEN (this.token).then(res=>{
        if(res.data.code==1 ||res.data.code==5001){
          // 失败 跳转到登录
           this.$router.push("/");
          //  
        }
      })

    //   var superArray=[];
    //   var normalArray=[];
    // function finddate(menu){


    // }

    //   for(let i in  this.treelist){
        
        
    //   }
    }
  };
</script>


<style lang='less'>
  a{
    text-decoration: none;
    color: #333;
  }
  .name {
    display: inline-block;
    position: relative;
    top: -4px;
    left: -10px;
    columns: #020202;;


  }

  .el-dropdown {
    top: 8px;
  }

  #app {
    display: flex;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    /* height: 100%; */
  }

  h5 {
    color: #fff;
    height: 40px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
  }

  .el-icon-milk-tea {
    font-size: 40px;
  }

  .el-header {
    background-color: #ffffff;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-main {
    background-color: #fff;
    margin-top: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  .el-aside {
    background-color: #565c63;
    color: #333;
  }

  .el-menu {
    border: 0;
  }

  .bgColors {
    color: #555;
    background-color: #f5f5f5;
  }

  #app {
    height: 100%;
    display: flex;
  }

  .el-container {
    height: 100%;
    background-color: #f0f2f5;
  }

  /* 尾部 */
</style>