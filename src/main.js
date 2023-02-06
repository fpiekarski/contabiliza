import Vue from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import VueCurrencyInput from "vue-currency-input";

import cors from "cors"
import VueHorizontalTimeline from "vue-horizontal-timeline";

Vue.use(VueHorizontalTimeline);
Vue.config.productionTip = false
const pluginOptions = {
  globalOptions: { currency: null,locale:"pt-BR" }
}
Vue.use(VueCurrencyInput, pluginOptions)
Vue.use(cors)
new Vue({
  
  render: h => h(App)
}).$mount('#app')
