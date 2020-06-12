import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { API_CHECKTOKEN } from "@/api/apis";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('../pages/Index.vue'),
            children: [{
                    path: '/index/home',
                    name: 'Home',
                    component: () => import('../pages/index/Home.vue'),
                },
                {
                    // 订单管理
                    path: '/index/order',
                    name: 'Order',
                    component: () => import('../pages/index/Order.vue'),
                },

                {
                    // 商品列表
                    path: '/index/list',
                    name: 'Product',
                    component: () => import('../pages/index/commodity/Product.vue'),
                },
                {
                    // 添加商品
                    path: '/index/goodsAdd',
                    name: 'GoodsAdduct',
                    component: () => import('../pages/index/commodity/AddMerchandise.vue'),
                },
                {
                    // 商品分类
                    path: '/index/classify',
                    name: 'Classify',
                    component: () => import('../pages/index/commodity/Classify.vue'),
                },
                {
                    // 店铺管理
                    path: '/index/shops',
                    name: 'Shops',
                    component: () => import('../pages/index/Shops.vue'),
                },
                {
                    // 账号列表
                    path: '/index/accountlist',
                    name: 'accountlist',
                    component: () => import('../pages/index/account/AccountList.vue'),
                },
                {
                    // 添加账户
                    path: '/index/addaccount',
                    name: 'addaccount',
                    component: () => import('../pages/index/account/AddAccount.vue'),
                },
                {
                    // 修改密码
                    path: '/index/change',
                    name: 'change',
                    component: () => import('../pages/index/account/Change.vue'),
                },
                {
                    //个人中心
                    path: '/index/personal',
                    name: 'personal',
                    component: () => import('../pages/index/account/Per.vue'),
                },
                {
                    // 商品统计
                    path: '/index/commodity',
                    name: 'commodity',
                    component: () => import('../pages/index/statistics/Commodity.vue'),
                },
                {
                    // 订单统计
                    path: '/index/indent',
                    name: 'indent',
                    component: () => import('../pages/index/statistics/Indent.vue'),
                }
            ]
        }
    ]
})

export default router;

router.beforeEach((to, from, next) => {
    from
    // to: Route: 即将要进入的目标 路由对象  from: Route: 当前导航正要离开的路由  next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
    //to: 要前往的路由route对象
    //from: 现在的route对象
    //next：函数，放行，表示继续下一步 如果传参则表示跳转到指定hash
    // 功能2： 权限拦截，不能通过hash值访问到非自己权限的页面！
    // to.meta 当前route的参数   localStorage.role 当前用户权限组
    // 想想动态树组件权限是怎么判断的

    
    // 如果要前往的不是首页的话,验证 token
    if (to.path != '/') {
        // 验证 token
        API_CHECKTOKEN(localStorage.token).then(res => {
            // 如果验证失败的话前往登录
            if (res.data.code == 0) {
                // 成功 放行
                next()
                // this.$router.push("/");
            } else next("/")
        })
    } else next()
})
