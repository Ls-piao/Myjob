<template>
    <view>
        <view class="test">
            {{time}}
            <button type="primary" @click="onShowDatePicker('time')">选择时间</button>
        </view>
        <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
    </view>
</template>
<script>
  import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
    export default {
        components: {
            MxDatePicker
        },
        data() {
            return {
                showPicker: false,
                time: '15:00:00',
                type: 'rangetime',
                value: ''
            }
        },
        methods: {
            onShowDatePicker(type){//显示
                this.type = type;
                this.showPicker = true;
                this.value = this[type];
            },
            onSelected(e) {//选择
                this.showPicker = false;
                if(e) {
                    this[this.type] = e.value; 
                    //选择的值
                    console.log('value => '+ e.value);
                    //原始的Date对象
                    console.log('date => ' + e.date);
                }
            }
        }
    }
</script>

<style>
    .test{
        text-align: center;
        padding: 10px 0;
    }
    button{
        margin: 20upx;
        font-size: 28upx;
    }
</style>