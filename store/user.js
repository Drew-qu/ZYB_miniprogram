export default {
	namespaced: true,
	state() {
		return {
			classnames: '',
			userProfile: uni.getStorageSync('userProfile') || {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickname: '微信用户'
			},
		}
	},
	mutations: {
		saveClassName(state, className) {
			state.classnames = className
		},
		saveProfile(state,profile) {
			state.userProfile = profile
			uni.setStorageSync('userProfile',profile)
		}
	}
}