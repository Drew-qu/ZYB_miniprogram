import Vue from 'vue';
import Vuex from 'vuex';

import userModule from './user';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		msg: 'vuex 已成功运行...',
	},
	modules: {
		'm_user': userModule
	}
})

export default store