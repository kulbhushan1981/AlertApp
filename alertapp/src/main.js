import Vue from 'vue';
import LogAlert from './LogAlert.vue';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false

new Vue({
  render: h => h(LogAlert),
}).$mount('#app')
