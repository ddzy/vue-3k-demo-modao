import Vue from 'vue'
import AnimateCSS from 'animate.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(AnimateCSS)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
