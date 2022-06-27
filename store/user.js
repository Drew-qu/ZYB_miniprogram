export default {
	namespaced: true,
	state() {
		return {
			classnames: ''
		}
	},
	mutations: {
		saveClassName(state, className) {
			state.classnames = className
		}
	}
}