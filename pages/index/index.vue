<template>
    <view class="container">
        <view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
        <text class="intro">详见：</text>
        <uni-link :href="href" :text="href"></uni-link>
        <uni-badge text="1"></uni-badge>
        <uni-badge text="2" type="success" @click="bindClick"></uni-badge>
        <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
        <uni-card :title="title" :isFull="isFull" :note="note" :thumbnail="thumbnail" :extra="extra"></uni-card>
        <uni-pagination show-icon="false" total="100" pageSize="10" current="2" prev-text="上一页" next-text="下一页"></uni-pagination>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">000</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">111</view>
			</swiper-item>
		</swiper>
    </view>
</template>

<script>
// import { uniBadge } from '@dcloudio/uni-ui'
export default {
    // components: { uniBadge },
    data() {
        return {
            href: 'https://uniapp.dcloud.io/component/README?id=uniui'
        }
    },
    methods: {}
}
</script>

<style>
.container {
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
}
.swiper-item:nth-child(1){
	height: 100%;
	background: #007AFF;
}

.swiper-item:nth-child(2){
	height: 100%;
	background: #4CD964;
}
</style>
