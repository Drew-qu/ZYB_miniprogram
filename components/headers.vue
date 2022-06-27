<template>
	<view>
		<view class="header">
			<view class="avatar">
				<image src="/static/img/VCG211286603775.jpg" mode=""></image>
			</view>
			<view class="center">
				<view class="nickname">用户昵称</view>
				<view class="nicknameClass">班级</view>
			</view>
			<view class="history" @click="goHistory">
				<uni-icons type="calendar-filled" size="38" color="#00aaff"></uni-icons>
				<view class="historyText">口算历史</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"headers",
		data() {
			return {
				
			};
		},
		methods: {
			goHistory() {
				uni.navigateTo({
					url: '/subpkg/pages/history/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			font-size: 25rpx;
			color: #626466;
			.historyText {
				margin-top: 10rpx;
			}
		}
	}
</style>