import Vue from 'vue';
import App from './main.vue';
import axios from 'axios';

window.axios = axios;
window.Vue = Vue;

new Vue(App).$mount('#app');

// 公共组件
Vue.component('spinner', require('./_components/spinner'));
Vue.component('toast', require('./_components/toast'));
Vue.component('page-header', require('./_components/page_header'));
