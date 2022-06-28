<template>
	<view>
		<view class="header">
			<uni-icons type="back" size="38" @click="visDialog"></uni-icons>
			<view class="time">{{hours}}:{{minute}}:{{second}}</view>
		</view>
		
		
		<view class="content">
			<view class="text">1/20题</view>
			<view class="blue"></view>
			<view class="white"></view>
		</view>
		<view class="footer">
			
		</view>
		
		<!-- 弹出dialog -->
		<view class="m_dialog" v-if="dialog">
			<view class="m_mask"></view>
			<view class="m_body">
				<img class='panda' src="/static/tabbar/xiongmao.png" alt="">
				<view class="m_title">要离开吗?</view>
				<view class="m_contents">退出联系后将不保留答题记录哦!</view>
				<view class="m_footer">
					<view class="m_left" @click="goback">退出练习</view>
					<view class="m_right" @click="Continue">继续练习</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(query) {
			this.className = query.query,
			 // 调用函数
			this.setInterval()
		},
		data() {
			return {
				className: '',
				hours: '0' + 0,   // 时
				minute: '0' + 0,   // 分
				second: '0' + 0,    // 秒
				dialog: false,
				time: ''
			};
		},
		methods: {
			// 计时器
			setInterval() {
			        let second = this.second
			        let minute = this.minute
			        let hours = this.hours       
			        this.time = setInterval(() => {  // 设置定时器
			            second++
			            if (second >= 60) {
			                second = 0  //  大于等于60秒归零
			                minute++
			                if (minute >= 60) {
			                    minute = 0  //  大于等于60分归零
			                    hours++
			                    if (hours < 10) {
			                        // 少于10补零
			                       hours = '0' + hours
			                    } else {
			                           hours = hours
			                    }
			                }
			                if (minute < 10) {
			                    // 少于10补零
			                       minute = '0' + minute
			                } else {
			                       minute = minute
			                }
			            }
			            if (second < 10) {
			                // 少于10补零
			                    second = '0' + second
			            } else {
			                   second = second
			            }
						this.hours = hours
						this.minute= minute
						this.second = second
			        }, 1000)
			    },
				visDialog() {
					this.dialog = true
					// 关闭定时器
					clearInterval(this.time)
				},
				// 退出练习页面
				goback() {
					uni.navigateBack()
					clearInterval(this.time)
				},
				// 点击继续练习按钮
				Continue() {
					this.dialog = false
					this.setInterval()
				}
			}
		}

</script>

<style lang="scss">
page {
	background-color: #f1f6fc;
}
.content {
		width: 90%;
		height: 230rpx;
		border: 1px solid transparent;
		position: absolute;
		top: 200rpx;
		left: 35rpx;
		border-radius: 30rpx;
		background-color: #268deb;
	.white {
		width: 80%;
		height: 120rpx;
		border: 1px solid transparent;
		position: absolute;
		background: #fff;
		top: 233rpx;
		left: 65rpx;
		border-radius: 0 0 30rpx 30rpx;
	}
	.text {
		background: #78bfff;
		width: 140rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		position: absolute;
		top: -10rpx;
		left: 40rpx;
		border-radius: 10rpx;
		color: #fff;
		font-size: 26rpx;
	}
}
.header {
	display: flex;
	margin-top: 20rpx;
	.time {
		border: 1px solid transparent;
		height: 65rpx;
		width: 165rpx;
		line-height: 65rpx;
		text-align: center;
		border-radius: 65rpx;
		color: #238ef0;
		font-weight: 700;
		background: #fff;
	}
}
.m_dialog {
	.m_mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
	}
	.m_body {
		position: absolute;
		bottom: 0%;
		width: 100%;
		background: #fff;
		height: 400rpx;
		border-radius: 40rpx 40rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.m_title {
		margin: 30rpx 0 40rpx;
		font-size: 40rpx;
		font-weight: 700;
	}
	.m_contents {
		font-size: 30rpx;
		color: #666;
	}
	.m_footer {
		display: flex;
		margin-top: 70rpx;
		justify-content: space-between;
		.m_left,.m_right {
			width: 280rpx;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			border-radius: 100rpx;
		}
		.m_left {
			border: 1rpx solid #ccc;
			margin-right: 50rpx;
		}
		.m_right {
			background-color: #2a9aff;
			color: #fff;
		}
	}
	.panda {
		width: 100px;
		height: 80px;
		position: absolute;
		top: -55px;
		left: 60rpx;
	}
	
}
</style>
 