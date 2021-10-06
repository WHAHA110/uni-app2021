<template>
    <view class>
        <map v-if="mapShow" @tap="mapSelect" style="width: 100%; height: 100vh;position:absolute;z-index:250" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
        <view class="container">
            <uni-forms ref="form" :modelValue="formData" :rules="rules">
                <!-- <view class="item">
                <uni-easyinput type="text" v-model="formData.name" placeholder="请输入账号" />
            </view>
            <view class="item">
                <uni-easyinput type="text" v-model="formData.passWord" placeholder="请输入密码" />
                </view>-->
                <uni-forms-item label="单位名称" name="name">
                    <uni-easyinput type="text" v-model="formData.name" placeholder="请输入拜访单位名称" />
                </uni-forms-item>
                <uni-forms-item label="省市区" name="passWord">
                    <uni-data-picker :localdata="items" popup-title="请选择城市" @change="onchange" @nodeclick="onnodeclick"></uni-data-picker>
                </uni-forms-item>
                <uni-forms-item label="详细地址" name="passWord">
                    <uni-easyinput type="text" v-model="formData.passWord" placeholder="请输入单位详细地址" />
                </uni-forms-item>
                <uni-forms-item label="精确定位" name="passWord">
                    <uni-easyinput type="text" :value="latitude+longitude" placeholder="请输入单位详细地址" @focus="mapClick" />
                </uni-forms-item>
                <uni-forms-item label="现场图片" name="passWord">
                    <uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @select="select" @progress="progress" @success="success" @fail="fail" />
                    <!-- <uni-easyinput type="text" v-model="formData.passWord" placeholder="请输入单位详细地址" /> -->
                </uni-forms-item>
            </uni-forms>
            <button @click="submit" type="primary">打 卡</button>
        </view>
    </view>
</template>

<script>
import { citys } from './city'
console.log(citys, '----------------->citys')

export default {
    data() {
        return {
            items: citys,
            index: 0,
            imageValue: [],
            mapShow: false,
            title: 'map',
            latitude: 39.909,
            longitude: 116.39742,
            covers: [
                // {
                //     latitude: 39.909,
                //     longitude: 116.39742,
                //     iconPath: '../../../static/location.png'
                // },
                // {
                //     latitude: 39.9,
                //     longitude: 116.39,
                //     iconPath: '../../../static/location.png'
                // }
            ],
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
        onchange(e) {
            const value = e.detail.value
        },
        onnodeclick(node) {},
        bindPickerChange: function (e) {
            console.log('picker发送选择改变，携带值为', e.target.value)
            this.index = e.target.value
        },
        // 获取上传状态
        select(e) {
            console.log('选择文件：', e)
        },
        // 获取上传进度
        progress(e) {
            console.log('上传进度：', e)
        },

        // 上传成功
        success(e) {
            console.log('上传成功')
        },

        // 上传失败
        fail(e) {
            console.log('上传失败：', e)
        },
        mapClick() {
            this.mapShow = true
            console.log(this.mapShow, '----------------->mapClick')
        },
        mapSelect(e) {
            let newPoint = e.detail
            this.latitude = newPoint.latitude
            this.longitude = newPoint.longitude
            this.mapShow = false
            console.log(e.detail, '----------------->mapSelect')
        },
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
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
    box-sizing: border-box;
    background: rgb(248, 248, 248);
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
