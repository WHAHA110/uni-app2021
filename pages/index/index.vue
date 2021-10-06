<template>
    <view class="container">
        <uni-forms ref="form" :modelValue="formData" :rules="rules">
            <view class="item">
                <uni-easyinput type="text" v-model="formData.name" placeholder="请输入账号" />
            </view>
            <view class="item">
                <uni-easyinput type="text" v-model="formData.passWord" placeholder="请输入密码" />
            </view>
            <!-- <uni-forms-item label="账号" name="name">
                <uni-easyinput type="text" v-model="formData.name" placeholder="请输入账号" />
            </uni-forms-item>
            <uni-forms-item label="密码" name="passWord">
                <uni-easyinput type="text" v-model="formData.passWord" placeholder="请输入密码" />
            </uni-forms-item>-->
        </uni-forms>
        <button @click="submit" type="primary">登 录</button>
    </view>
</template>

<script>
// import { uniBadge } from '@dcloudio/uni-ui'

export default {
    // components: { uniBadge },
    data() {
        return {
            rules: {},
            formData: {},
            time: null,
            cgd: '时间选择弹框',
            href: 'https://uniapp.dcloud.io/component/README?id=uniui'
        }
    },
    created() {
        console.log(uni, '----------------->uni')
        // uni.showLoading({
        //     title: '加载中...'
        // })
    },
    methods: {
        submit() {
            console.log(this.formData, '----------------->submit')
            uni.redirectTo({
                url: '/pages/home/index?id=1'
            })
        },
        cg(date) {
            console.log(date)
            this.time = date.detail.value
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    position: absolute;
    top: 15%;
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
    box-sizing: border-box;
    .item {
        margin-bottom: 25px;
    }
}
.swiper-item:nth-child(1) {
    height: 100%;
    background: #007aff;
}

.swiper-item:nth-child(2) {
    height: 100%;
    background: #4cd964;
}
</style>
