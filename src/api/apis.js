// 引入 axios
import axios from 'axios'
// 服务器 ip 地址
export const SERVE_IP='http://127.0.0.1:5000'
// 商品上传地址
export const SERVE_SHOP= SERVE_IP+'upload/shop/'


// 设置请求地址
axios.defaults.baseURL = SERVE_IP

// 1.登录接口
// account:用户名  password:密码
export const API_CHECKLOGIN = (account, password) => axios.post('/users/checkLogin', { account, password})
// 2.添加账户   account:用户名  password:密码  userGroup:用户组
export const API_ADD = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup})
// 3.获取账号列表   currentPage:当前页码   pageSize:每页条数  {params: {参数1, 参数2}}
export const API_LIST = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })
// 4.删除账号 id:id
export const API_DEl = (id) => axios.get('/users/del', { params: { id}})
// 5.批量删除账号 ids:要删除数据的id组成的数组（字符串格式
export const API_BATCHDEL = (ids) => axios.get('/users/batchdel', { params: { ids}})
// 6.修改账号  id:要修改账号的id ,account:账号,userGroupid:用户组
export const API_EDIT = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup})
// 7.检查旧密码是否正确   oldPwd:旧密码(String)  id:帐号id
export const API_CHECKOLDPWD = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id }})
// 8.修改密码  newPwd	String新密码 ,   帐号id
export const API_EDITPWD = (newPwd, id) => axios.post('/users/editpwd', { newPwd, id, })
// 9.获取账号（个人中心）信息  id:id
export const API_ACCOUNTINFO = (id) => axios.get('/users/accountinfo', { params: { id}})
// 10.头像上传接口   id
export const API_AVATAR_UPLOAD = (param,config) => axios.post('/users/avatar_upload ',{ param ,config})
// 11.验证 token 是否过期    token
export const API_CHECKTOKEN =(token)=>axios.get('/users/checktoken',{params:{token}})
// 12.添加分类  cateName 分类名称   state 是否启用    
export const API_GOODS_ADDCATE = (cateName,state) => axios.post('/goods/addcate', {cateName,state})
// 13.获取分类 /goods/catelist // currentPage	Int	是	当前页 // pageSize	Int	是	每页条数
export const API_GOODS_CATELIST = (currentPage,pageSize	) => axios.get('/goods/catelist',{ params: { currentPage,pageSize}})
// 14.删除分类  /goods/delcate 
export const API_GOODS_DELCATE = (id) => axios.get('/goods/delcate',{ params: {id}})
// 15.修改分类 id	Int	是	分类id cateName	String	是	分类名称 state	Boolean	是	分类状态
export const API_GOODS_EDITCATE = (id,cateName,state) => axios.post('/goods/editcate', {id,cateName,state})
// 16.查询所有分类名称
export const API_GOODS_CATEGORIES = () => axios.get('/goods/categories',{ params: {}})
// 17.商品图片上传接口  binary	是	二进制数据流
// 18.添加商品  name	String	是	商品名称 // category	String	是	商品分类 // price	String	是	商品价格 // imgUrl	String	是	商品图片地址 // goodsDesc	String	是	商品描述
export const API_GOODS_ADD = (name,category	,price,imgUrl,goodsDesc) => axios.post('/goods/add', {name,category	,price,imgUrl,goodsDesc})
// 19.获取商品列表 currentPage	int	是	当前页码 pageSize	int	是	每页条数   
export const API_GOODS_LIST = (currentPage,pageSize) => axios.get('/goods/list',{ params: {currentPage,pageSize}})
// 20.删除商品  
export const API_GOODS_DEL = (id) => axios.get('/goods/del',{ params: {id}})
//21.修改商品 name	String	是	商品名称 category	String	是	商品分类 price	String	是	商品价格 imgUrl	String	是	商品图片地址 goodsDesc	String	是	商品描述 id	int	是	商品ID
export const API_GOODS_EDIT= (name,category,price,imgUrl,goodsDesc,id) => axios.post('/goods/edit', {name,category,price,imgUrl,goodsDesc,id})
// 22.获取订单列表
export const API_ORDER_LIST = (currentPage,pageSize,orderNo,consignee, phone, orderState,date) => axios.get('/order/list',{ params: {currentPage,pageSize,orderNo,consignee, phone, orderState,date}})
// currentPage	int	是	当前页码
// pageSize	int	是	每页条数
// orderNo	string	否	订单号
// consignee	string	否	收货人
// phone	string	否	手机号
// orderState	string	否	订单状态
// date	string	否	时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
// 23.查询
export const API_ORDER_SEARCH = (currentPage,pageSize,orderNo,consignee, phone, orderState,date) => axios.get('/order/search',{ params: {currentPage,pageSize,orderNo,consignee, phone, orderState,date}})
// 参数	类型	是否必填	参数说明
// currentPage	int	是	当前页码
// pageSize	int	是	每页条数
// orderNo	string	是	订单号
// consignee	string	是	收货人
// phone	string	是	手机号
// orderState	string	是	订单状态
// date	string	是	时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
// 24.获取订单详情  id	int  /order/detail
export const API_ORDER_DETAIL= (id) => axios.get('/order/detail',{ params: {id}})
// 25.修改订单
// id	int	是	要修改账号的id
// orderNo	String	是	订单号
// orderTime	String	是	下单时间
// phone	String	是	电话
// consignee	String	是	收货人
// deliverAddress	String	是	送货地址
// deliveryTime	String	是	送达时间
// remarks	String	是	备注
// orderAmount	String	是	订单金额
// orderState	String	是	订单状态
export const API_ORDER_EDIT= (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState) => axios.post('/order/edit', {id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})
// 26.获取店铺详情  
export const API_SHOP_INFO= () => axios.get('/shop/info',{ params: {}})
// 27.店铺图片上传接口  
export const API_SHOP_UPLOAD = (id,cateName,state) => axios.post('/shop/upload', {id,cateName,state})
// 28.店铺内容修改
// id	int	是	店铺id
// name	string	是	店铺名称
// bulletin	string	是	店铺公告
// avatar	string	是	店铺头像
// deliveryPrice	int	是	起送价格
// deliveryTime	int	是	送达时间
// description	string	是	店铺描述
// score	float	是	店铺好评率
// sellCount	int	是	店铺销量
// supports	string数组	是	活动支持
// date	string数组	是	营业时间
// pics	string数组	是	图片
export const API_SHOP_EDIT = (params) => axios.post('/shop/edit', params)






// 29.首页报表接口
export const API_ORDER_TOTALDATA= () => axios.get('/order/totaldata',{ params: {}})
// 30.订单统计
// 字符串格式数组，如["2019-10-01 00:00:00", "2019-10-10 00:00:00"]
export const API_ORDER_ORDERTOTAL= (date) => axios.get('/order/ordertotal',{ params: {date}})











