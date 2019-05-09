import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		code:-1,
		isCollapse:false
	},
	mutations: {
		login(state,code) {
			state.code = code;
		},
		logout(state,code) {
			state.code = code;
		},
		setCollapse(state){
			state.isCollapse = !state.isCollapse;
			
		}
	}
})

