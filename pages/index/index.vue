<template>
	<view>
		<!-- 标题 -->
		<view class="tit">作业帮口算</view>
		<!-- 头部 -->
		<view class="header" >
			<view class="avatar" @click="getUserInfo">
				<image :src="userProfile.avatarUrl" mode=""></image>
			</view>
			<view class="center" @click="vibDialog">
				<view class="nickname">{{userProfile.nickname}}</view>
				<view class="classname">
					<text v-if='classnames'>{{classnames}}</text>
					<text v-else>班级</text>
				</view>
			</view>
			<view class="history" @click="goHistoryList">
				<uni-icons type="wallet-filled" size="38" color="#00aaff"></uni-icons>
				<view class="historyText">历史记录</view>
			</view>
			<button open-type="contact" class="feedback">
				<view>
					<uni-icons class='icon' type="compose" size="38" color="#ffb400"></uni-icons>
					<view class="feedbackText" open-type="feedback">反馈</view>
				</view>
			</button>
			
		</view>
		
		<!-- 作业检查 -->
		<view class="work" @click="takePhoto">
			<img src="../../static/img/camera.png" alt="">
		</view>
		
		
		<!-- 弹出 dialog -->
		<view class="m_dialog" v-if="display">
			<view class="mask"></view>
			<view class="body">
				<view class="top">
					<img class='panda' src="../../static/tabbar/xiongmao.png" alt="">
					<view class="topTitle" @click="vibDialogSetting">暂不设置</view>
					<view class="sle">选择年级</view>
				</view>
				<view class="row">
					<view class="grd" :class="{'active':index==ins}" @click="active(index,item.name)" v-for="(item,index) in classes" :key="item.id">{{item.name}}</view>
				</view>
				<view class="button" @click="vibDialogSub">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
	
		onLoad() {
			this.ctx = uni.createCameraContext()
		  },
		data() {
			return {
				display: false,
				ins: 0,
				className: '',
				classes: [
					{id:1, name: '一年级'},
					{id:2, name: '二年级'},
					{id:3, name: '三年级'},
					{id:4, name: '四年级'},
					{id:5, name: '五年级'},
					{id:6, name: '六年级'},
				],  
			};
		},
		computed: {
			...mapState('m_user', ['classnames']),
			...mapState('m_user', ['userProfile'])
		},
		methods: {
			// 点击 dialog 显示隐藏
			vibDialog() {
				this.display = !this.display
			},
			// 点击切换年级 active
			active(num,name) {
				this.ins = num
				this.className = name
			},
			// 点击暂不设置按钮
			vibDialogSetting() {
				this.topClassName = '未设置'
				this.display = false
			},
			// 点击切换年级确定按钮
			vibDialogSub(){
				this.display = false
				// 存入vuex
				this.$store.commit('m_user/saveClassName', this.className)
				// this.topClassName = this.className
			},
			// 点击历史记录按钮
			goHistoryList() {
				uni.navigateTo({
					url: '/subpkg/pages/historyList/index'
				})
			},
			// 点击反馈中心按钮
			goFeedback(e) {
				console.log('反馈中心');
			},
			// 作业检查按钮
			takePhoto() {
			this.ctx.takePhoto({
				  quality: 'high',
				  success: (res) => {
					this.setData({
					  src: res.tempImagePath
					})
				  }
				})
					
			},
			// 获取用户信息
			getuserInfo() {
				uni.navigateTo({
					url: '../../subpkg/pages/profile/index'
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.header{
		display: flex;
		justify-content: space-between;
		padding: 40rpx;
		.avatar {
			width: 120rpx;
			height: 120rpx;
			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.center {
			flex: 1;
			padding-left: 20rpx;
			.nickname {
				font-size: 36rpx;
				font-weight: 700;
				margin-bottom: 20rpx;
			}
			.nicknameClass {
				font-size: 30rpx;
				color: #626466;
			}
		}
		.history {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 25rpx;
			color: #626466;
			.historyText {
				margin-top: 10rpx;
			}
		}
		.feedback {
			background: transparent;
			border: 0px !important;
			height: 113rpx;
			padding: 0;
			width: 100rpx;
			right: 0;
			bottom: 0;
			line-height: 1;
			view {
				z-index: 100;
			}
			.feedbackText{
				font-size: 25rpx;
				margin-top: 18rpx;
				color: #626466;
			}
		}
	}
	
	.feedback::after {
		border: 0;
	}
	.tit {
		font-size: 20px;
		text-align: center;
	}
	content {
		
		border: 1px black solid;
	}
	.m_dialog {
		.mask {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,.6);
		}
		.body {
			position: fixed;
			bottom: 0;
			background: #fff;
			width: 100%;
			height: 40%;
			border-radius: 10px 10px 0 0;
			.top {
				padding: 15px;
				.topTitle {
					position: absolute;
					font-size: 14px;
					color: #a5a8ab;
				}
				.sle {
					text-align: center;
					font-size: 26px;
					font-weight: 700;
					}
				}
			.row {
				display: flex;
				justify-content: space-between;
				margin: 15px 30px;
				flex-wrap: wrap;
				.grd {
					background: #f7f9fa;
					width: 100px;
					text-align: center;
					line-height: 40px;
					border-radius: 40px;
					margin-bottom: 20px;
				}
				.active {
					background-color: #ecf6ff;
					color: #44a6ff;
				}
			}
			.button {
				    text-align: center;
				    font-size: 18px;
				    width: 90%;
				    background: #319dff;
				    height: 50px;
				    color: #fff;
				    line-height: 50px;
				    border-radius: 50px;
				    margin-left: 22px;
				
			}
			.panda {
				width: 100px;
				height: 80px;
				position: absolute;
				top: -55px;
			}
		}
	}
	.work {
		width: 500rpx;
		height: 500rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		img {
			width: 100%;
			height: 100%;
		}
	}
	.recom {
		display: flex;
		justify-content: center;
		position: fixed;
		top: 80%;
		left: 33%;
		width: 260rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #f7f7fe;
		border-radius: 90rpx;
		text-align: center;
	}
</style>
