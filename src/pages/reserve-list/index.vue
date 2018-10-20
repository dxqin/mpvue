<template>
  <div class="reserve-list-index w-full container-middle">
    <!-- 预定选择 -->
    <div class="reserve-list-search mt30 plr20 ptb20 pos-re">
      <p class="c3b f16 ptb20">预定选择</p>
      <div class="f14 c-app border-bottom-have">
        <input type="text" v-model="searchAddress" class="ptb14">
      </div>
      <div class="flex-row jc-bet border-bottom-have ptb14">
        <div class="flex-col w50">
          <p class="f12">入住</p>
          <picker mode="date"
            :value="startDate"
            :start="pickerStart" end="2217-09-01" @change="bindDateChangeStart($event)">
              <div class="index_picker">
                <div class="f14 c-app">{{ startDate }}</div>
              </div>
          </picker>
        </div>
        <div class="flex-col w50">
          <p class="f12">退房</p>
          <picker mode="date"
            :value="endDate"
            :start="pickerEnd" end="2217-09-01" @change="bindDateChangeEnd($event)">
              <div class="index_picker">
                <div class="f14 c-app">{{ endDate }}</div>
              </div>
          </picker>
        </div>
      </div>
      <div class="flex-row jc-bet border-bottom-have ptb14">
        <div class="flex-col w50">
          <p class="f12">房间数</p>
          <p class="f14 c-app dis-flex jc-str">
            <input type="number" v-model="houseNums" placeholder="请选择房间数" style="width: 60rpx">
            <span>间</span>
          </p>
        </div>
        <div class="flex-col w50">
          <p class="f12">人数</p>
          <p class="f14 c-app dis-flex jc-str">
            <input type="number" v-model="personNums" placeholder="请选择人数" style="width: 60rpx">
            <span>人</span>
          </p>
        </div>
      </div>
      <!-- <div style="height: 25rpx"></div> -->
      <div style="position: absolute; bottom: -35rpx; left: calc(50% - 180rpx)">
        <div class="dis-flex jc-c">
          <div class="search-btn tc cfff f16 app-btn br10">搜索</div>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result" style="margin-top: 184rpx">
      <div class="hotel-index br10">
        <div class="img-box pos-re br10">
          <img :src="hotelImg" class="img-box br10" alt="">
          <div class="flex-row jc-bet pos-ab hotel-mark pl20 pr20 bb">
            <div class="container-middle jc-str" style="align-items: right">
              <p class="f12 cfff">就带你名</p>
              <p class="f10 cfff">古墩路店</p>
            </div>
            <div class="flex-col-xy-middle jc-end" style="height: 78rpx">
              <img :src="hotelImg" class="hotel-mark-icon" alt="">
              <img :src="hotelImg" class="hotel-mark-icon" alt="">
            </div>
          </div>
        </div>
        <div>
          <p class="hotel-abstract f10 c3b text-overf-ell tc pl20 pr20 bb">酒店崇尚自然生活，在忆泊静享生活，或许还能邂逅一段回忆酒店崇尚自然生活，在忆泊静享生活，或许还能邂逅一段回忆</p>
        </div>
      </div>
      <!-- 公寓下的套餐 -->
      <div>
        <div class="hotel-child-list bb br10 mt40 pos-re">
          <div class="hotel-child-title flex-row jc-bet" @click="checkHotel(0)">
            <div class="hotel-child-left bb">
              <img class="hotel-child-left-img" :src="hotelImg" alt="">
            </div>
            <div class="hotel-child-right p10 bb dis-flex jc-ar">
              <div class="oner-left">
                <p class="flex-row jc-bet">
                  <span class="c3b f14">云舍大床房</span>
                  <span class="c3b f18">¥500</span>
                </p>
                <p class="f10 c-app">
                  <span>含早</span>
                </p>
                <p class="f10 c3b">一张1.5m双人床/24㎡/2-3楼/有窗</p>
              </div>
              <div class="right-icon tc">
                <div :class="isactive === 0 ? 'icon-content-active' : 'icon-content'">
                </div>
              </div>
            </div>
          </div>
          <div class="hotel-child-item plr20 pb100">
            <div class="hotel-child-item-child pl10 bcbb border-bottom-have dis-flex jc-bet plr6 ptb16">
              <div class="child-left pl10">
                <p><span class="f14 cc2">活动1</span><span class="f10 c3b">详情</span></p>
                <p class=" f12 c3b">大床</p>
                <p class="f10 c-app">
                  <span class="mr10">有免费wifi</span>
                </p>
              </div>
              <div class="c3b f20  dis-flex jc-bet aic">
                <div>
                  ￥495
                </div>
                <div>
                  <p class="reserve-btn app-btn f14 tc br20">预定</p>
                </div>
              </div>
            </div>
            <div class="hotel-child-item-child pl10 bcbb border-bottom-have dis-flex jc-bet plr6 ptb16">
              <div class="child-left pl10">
                <p><span class="f14 cc2">活动1</span><span class="f10 c3b">详情</span></p>
                <p class=" f12 c3b">大床</p>
                <p class="f10 c-app">
                  <span class="mr10">有免费wifi</span>
                </p>
              </div>
              <div class="c3b f20  dis-flex jc-bet aic">
                <div>
                  ￥495
                </div>
                <div>
                  <p class="reserve-btn app-btn f14 tc br20">预定</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hotel-child-list bb br10 mt40">
          <div class="hotel-child-title flex-row jc-bet"  @click="checkHotel(1)">
            <div class="hotel-child-left bb">
              <img class="hotel-child-left-img" :src="hotelImg" alt="">
            </div>
            <div class="hotel-child-right p10 bb dis-flex jc-ar">
              <div class="oner-left">
                <p class="flex-row jc-bet">
                  <span class="c3b f14">云舍大床房</span>
                  <span class="c3b f18">¥500</span>
                </p>
                <p class="f10 c-app">
                  <span>含早</span>
                </p>
                <p class="f10 c3b">一张1.5m双人床/24㎡/2-3楼/有窗</p>
              </div>
              <div class="right-icon tc">
                <div :class="isactive === 1 ? 'icon-content-active' : 'icon-content'">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './wxss/index.wxss'
export default {
  data() {
    return {
      searchAddress: '忆泊城市艺术酒店（古墩路店）',
      startDate:'2018-05-9',
      pickerStart:'2018-05-6',
      endDate:'2018-05-10',
      pickerEnd:'2018-05-7',
      dateStart: new Date(),
      dateEnd: new Date(),
      houseNums: 1,
      personNums: 1,
      hotelImg: '../../static/img/rec.png',
      isactive: -1
    }
  },
  mounted(){
  // 设置时间
    this.getToday()
  },
  methods: {
    checkHotel(val = -1) {
      this.isactive = val;
    },
    getToday(val, bol){
      let myDate;
      if (val) {
        if (!bol) {
          myDate = new Date(val);
        } else {
          console.log(this.dateStart)
          myDate = new Date(this.dateStart);
        }
      } else {
        myDate = new Date();
        this.pickerStart = myDate;
        this.pickerEnd = myDate;
      }
      let nextDate = myDate;
      if (!bol) {
        nextDate = +myDate + 1000*60*60*24;
        nextDate = new Date(nextDate)
      } else {
        nextDate = new Date(val)
      }
      console.log(myDate, nextDate)
      let myMonth = myDate.getMonth() + 1;
      let nextMonth = nextDate.getMonth() + 1;
      const weekArr = new Array("日", "一", "二", "三", "四", "五", "六");  
      if (myMonth < 10) {
        myMonth = '0'+ myMonth;  //补齐
      }
      if (nextMonth < 10) {
        nextMonth = '0'+ nextMonth;  //补齐
      }
      let mydate = myDate.getDate();
      let nextdate = nextDate.getDate();
      if (myDate.getDate()<10) {
          mydate = '0'+ myDate.getDate();  //补齐
      }
      if (nextDate.getDate()<10) {
          nextdate = '0'+ nextdate.getDate();  //补齐
      }
      const myWeek = myDate.getDay()
      const nextWeek = nextDate.getDay()
      const today = `${myMonth}月${ mydate }日 (周${weekArr[myWeek]})`;
      const nextday = `${nextMonth}月${ nextdate }日 (周${weekArr[nextWeek]})`;
      this.startDate = today
      this.endDate = nextday
    },
    bindDateChangeStart(even) {
      const { value } = even.target;
      this.dateStart = value;
      this.pickerStart = value;
      this.pickerEnd = value;
      this.getToday(value)
    },
    bindDateChangeEnd(even) {
      const { value } = even.target;
      this.dateEnd = value;
      this.getToday(value, true)
    }
  }
}
</script>
