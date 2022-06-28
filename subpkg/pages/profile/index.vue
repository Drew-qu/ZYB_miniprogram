<template>
  <view class="profile"> 
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar='onChooseAvatar'>
		<image class="avatar" :src="userProfile.avatarUrl" mode=""></image>
	</button>
	<view class="nickname-wrapper">
		<label style="width: 120rpx;" for="">昵称：</label>
		<input type="nickname" placeholder="请输入昵称" :value="userProfile.nickname" @blur="onBlurNickName"/>
	</view>
	<van-button type='primary' block @click='saveProfile'>确认</van-button>
  </view>
</template>

<script>
  export default {
	data() {
		  return {
			  userProfile: {
				  avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				  nickname: '微信用户'
			  }
		}
	},
	methods: {
		onChooseAvatar(ev) {
			this.userProfile.avatarUrl = ev.detail.avatarUrl
		},
		onBlurNickName(ev) {
			
			this.userProfile.nickname = ev.detail.value
		},
		saveProfile() {
			this.$store.commit('m_user/saveProfile', this.userProfile)
			uni.navigateBack()
		}
	}
  }
</script>

<style lang="scss" scoped>
  .profile {
    padding: 0 40rpx;
  }
  
  .avatar-wrapper {
    padding: 0;
    width: 112rpx;
    border-radius: 16rpx;
    margin-top: 80rpx;
    margin-bottom: 120rpx;
  
    &::after {
      content: '';
      border: none;
    }
  
    .avatar {
      display: block;
      width: 112rpx;
      height: 112rpx;
    }
  }
  
  .nickname-wrapper {
    display: flex;
    align-items: center;
    height: 80rpx;
    border-bottom: 1rpx solid #eee;
    margin-bottom: 40rpx;
  
    label {
      width: 100rpx;
      color: #333;
      font-size: 34rpx;
    }
  
    input {
      color: #666;
      font-size: 34rpx;
    }
  }
</style>