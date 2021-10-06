<template>
    <view class="container">
        <view class="menusBox">
            <view class="menusItem" @click="itemClick()">
                <!-- <view class="menusItem" v-for="index in 17"> -->
                <img src="../../static/uni.png" alt class="icon" mode="widthFix" />
                <view class="codeTitle">拜访打卡</view>
            </view>
        </view>
        <view class="codeBox">
            <view class="codeTitle">我的推荐码</view>
            <view class="code">ABC123</view>
        </view>
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
        itemClick() {
            console.log(this.formData, '----------------->submit')
            uni.redirectTo({
                url: '/pages/visit/index?id=1'
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
    height: 100vh;
    width: 100%;
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
    box-sizing: border-box;
    background: rgb(60, 189, 122);
    .menusBox {
        overflow: auto;
        height: 70%;
        background: #fff;
        margin-bottom: 15px;
        border-radius: 15px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-items: center;
        .menusItem {
            width: 21%;
            color: #333;
            text-align: center;
            margin: 5px;
            img {
                width: 100%;
            }
        }
    }
    .codeBox {
        height: 25%;
        background: #fff;
        margin-bottom: 25px;
        border-radius: 15px;
        padding: 20px;
        box-sizing: border-box;
        .codeTitle {
            font-size: 16px;
            font-weight: bold;
        }
        .code {
            margin-top: 35px;
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            color: rgb(80, 134, 209);
        }
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
