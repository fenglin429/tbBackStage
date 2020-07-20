import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
// 引入router暴露的实例对象===路径
import router from './router/router';
import './assets/styles/reset.css';


Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
