<template>
	<view>
		<view class="tit">作业帮口算</view>
		<view class="header">
			<view class="avatar">
				<image src="/static/img/VCG211286603775.jpg" mode=""></image>
			</view>
			<view class="center"  @click="vibDialog">
				<view class="nickname">用户昵称</view>
				<view class="nicknameClass">
					<text v-if="classnames">{{classnames}}</text>
					<text v-else>班级</text>
				</view>
			</view>
			<view class="history" @click="goHistory">
				<uni-icons type="calendar-filled" size="38" color="#00aaff"></uni-icons>
				<view class="historyText">口算历史</view>
			</view>
		</view>
		
		<!-- 练习部分 -->
		<view class="box">
			<view class="to">
				<view class="le" @click="checkLe">AI智能练习</view>
				<view class="ri" @click="checkRi">知识点练习</view>
			</view>
			<view class="leftbox" v-if="checked">
				<view class="pic">
					<img src="../../static/img/pic_pra.png">
				</view>
				<view class="rom">立即口算</view>
				<view class="text">已有5645646854563人使用AI智能练习</view>
			</view>
			<view class="rightbox" v-else>右边盒子</view>
		</view>
		
		<view class="m_dialog" v-if="display">
			<view class="mask"></view>
			<view class="body">
				<view class="top">
					<img class='panda' src="../../static/tabbar/xiongmao.png" alt="">
					<view class="topTitle" @click="vibDialog">暂不设置</view>
					<view class="sle">选择年级</view>
				</view>
				<view class="row">
					<view class="grd" :class="{'active':index==ins}" @click="active(index,item.name)" v-for="(item,index) in classes" :key="item.id">{{item.name}}</view>
				</view>
				<view class="button" @click="vibDialogSub">确定</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
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
				checked: true
			};
		},
		computed: {
			...mapState('m_user', ['classnames'])
		},
		methods: {
			vibDialog() {
				this.display = !this.display
			},
			active(num,name) {
				this.ins = num
				this.className = name
			},
			vibDialogSub(){
				this.display = false
				// 存入vuex
				this.$store.commit('m_user/saveClassName', this.className)
				// console.log(this.classname);
			},
			goHistory() {
				uni.navigateTo({
					url: '/subpkg/pages/history/index'
				})
			},
			goOral() {
				uni.navigateTo({
					url: '/subpkg/pages/practicePages/index'
				})
			},
			checkLe() {
				this.checked = true
			},
			checkRi() {
				this.checked = false
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
	}
	.box {
		margin-top: 50rpx;
		margin-left: 30rpx;
		border: 1px solid #f1f1f1;
		width: 92%;
		border-radius: 30rpx;
		box-shadow: 0 0 10rpx rgba(0,0,0,.1);
		.to {
			display: flex;
			border-bottom: 0;
			width: 100%;
			height: 100rpx;
			.le,.ri {
				width: 50%;
				height: 100%;
				border-right: 1px #f1f1f1 solid;
				line-height: 100rpx;
				text-align: center;
			}
			.ri {
				border-bottom: 1px #f1f1f1 solid;
			}
		}
		
		.leftbox,.rightbox {
			border-top: 0;
			// border: 1px #f1f1f1 solid; // 删掉
			height: 800rpx;
			width: 100%;
		}
		.leftbox {
			.pic {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
			.rom {
				position: absolute;
				bottom: 325rpx;
				left: 120rpx;
				width: 70%;
				background: #128eff;
				color: #fff;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 80rpx;
			}
			.text {
				position: absolute;
				bottom: 260rpx;
				left: 190rpx;
				font-size: 12px;
				color: #f7bd5d;
			}
		}
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
</style>
