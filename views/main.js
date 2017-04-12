import Vue from 'vue';
import App from './main.vue';
import axios from 'axios';

window.axios = axios;
window.Vue = Vue;

new Vue(App).$mount('#app');
