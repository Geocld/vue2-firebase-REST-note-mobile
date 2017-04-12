import Vue from 'vue';
import App from './m.vue';
import axios from 'axios';

window.axios = axios;
window.Vue = Vue;

new Vue(App).$mount('#app');
