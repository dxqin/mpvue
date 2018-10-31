<template>
  <div class="reserve-list-index w-full container-middle">
    <!-- 预定选择 -->
    <div class="reserve-list-search mt30 plr20 ptb20 pos-re">
      <p class="c3b f16 ptb20">预定选择</p>
      <div class="f14 c-app border-bottom-have">
        <picker
          :range="pickerValueArray"
          range-key="label"
          @change="changeHotel"
        >
          <view class="picker">
            {{pickerLabelDefault || '请选择'}}
          </view>
        </picker>
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
            <input type="number" v-model="houseNums" placeholder=" " style="width: 60rpx">
            <span>间</span>
          </p>
        </div>
        <div class="flex-col w50">
          <p class="f12">人数</p>
          <p class="f14 c-app dis-flex jc-str">
            <input type="number" v-model="personNums" placeholder=" " style="width: 60rpx">
            <span>人</span>
          </p>
        </div>
      </div>
      <div style="position: absolute; bottom: -35rpx; left: calc(50% - 180rpx)">
        <div class="dis-flex jc-c">
          <div class="search-btn tc cfff f16 app-btn br10" @click="searchHotel">搜索</div>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result" style="margin-top: 184rpx" v-show="hotelMsg.checkHotelId">
      <div class="hotel-index br10">
        <div class="img-box pos-re br10">
          <div >
            <swiper :indicator-dots="indicatorDots"
              class="swiper"
              autoplay="false" interval="5000" duration="1000"
              v-show="type == 'family'"
            >
              <block v-for="(item, index) in hotelMsg.hotelImg" :key="index">
                <swiper-item>
                  <image :src="item" class="img-box" />
                </swiper-item>
              </block>
            </swiper>
            <map id="map" v-show="type == 'local'" :longitude="hotelMsg.latitude" :latitude="hotelMsg.longitude" style="width: 702rpx; height: 342rpx"></map>
            <div id="map" v-show="type == 'detial'" class="tc f16 c3b"  style="width: 702rpx; height: 342rpx; align-items: center">
              <p>{{hotelMsg.hotelDetial}}</p>
            </div>
          </div>
          <div class="flex-row jc-bet pos-ab hotel-mark pl20 pr20 bb">
            <div class="container-middle jc-str" style="align-items: right">
              <p class="f12 cfff">{{hotelMsg.headHotelName}}</p>
              <p class="f10 cfff">{{hotelMsg.hotelName}}</p>
            </div>
            <div class="flex-col-xy-middle jc-end" style="height: 78rpx">
              <p class="ml15 tc bsbb mark-box" @click="changeShow('detial')">
                <img :src="hotelImg[0]" class="hotel-mark-icon" alt="">
              </p>
              <p class="ml15 tc bsbb mark-box" @click="changeShow('local')">
                <img :src="hotelImg[1]" class="hotel-mark-icon" alt="">
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="hotel-abstract f10 c3b text-overf-ell tc pl20 pr20 bb">
            {{hotelMsg.hotelDetial}}
          </p>
        </div>
      </div>
      <!-- 公寓下的套餐 -->
      <div>
        <div class="hotel-child-list bb br10 mt40" v-for="(item, index) in hotelDetialList" :key="index">
          <!-- 房源的总述 -->
          <div class="hotel-child-title flex-row jc-bet"  @click="checkHotel(item.roomTypeId)">
            <div class="hotel-child-left bb">
              <img class="hotel-child-left-img" :src="item.imgUrls[0] || hotelImgs" alt="">
              <!-- {{item.imgUrls}} -->
            </div>
            <div class="hotel-child-right p10 bb dis-flex jc-ar">
              <div class="oner-left">
                <p class="flex-row jc-bet" style="align-items: center">
                  <span class="c3b f14">{{item.roomTypeName}}</span>
                  <span class="c3b f18">¥{{item.basePrice}}</span>
                </p>
                <!-- <p class="f10 c-app">
                  <span>含早</span>
                </p> -->
                <p class="f10 c3b">{{item.bedStatus || '床型未知'}}/{{item.area || '面积未知'}}/{{item.floor || '楼层未知'}}/{{item.window == 1? '有窗' : '无窗'}}</p>
              </div>
              <div class="right-icon tc">
                <div :class="isactive === item.roomTypeId ? 'icon-content-active' : 'icon-content'">
                </div>
              </div>
            </div>
          </div>
          <!-- 房源的子套餐 -->
          <div class="hotel-child-item plr20 pb100" :class="isactive === item.roomTypeId ? 'icon-child-active' : 'icon-child'">
            <div class="hotel-child-item-child pl10 bcbb border-bottom-have dis-flex jc-bet plr6 ptb16"
              v-for="(items, indexs) in item.roomPrices" :key="index"
            >
              <div class="child-left pl10">
                <p><span class="f14 cc2">{{items.roomPriceName}}</span><span class="f10 c3b">详情</span></p>
                <p class=" f12 c3b">{{items.bedType}}</p>
                <p class="f10 c-app">
                  <span class="mr10">{{items.valueAddedService}}</span>
                </p>
              </div>
              <div class="c3b f20  dis-flex jc-bet aic">
                <div>
                  ￥{{items.price}}
                </div>
                <div class="ml15">
                  <p class="reserve-btn app-btn f14 tc br20" @click="toReserve(items.roomPriceId, item.unoccupied, items)">预定</p>
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
import mpvuePicker from 'mpvue-picker';
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
      hotelImgs: '../../static/img/rec.png',
      hotelImg: ['../../static/img/detialIcon.png', '../../static/img/location.png'],
      isactive: -1,
      pickerValueArray: [], // 酒店列表
      selectId: '',
      pickerLabelDefault: '',
      pickerValueDefault: '',
      mode: 'selector',
      hotelMsg : {
        hotelImg: ['../../static/img/rec.png'], // 酒店图片
        hotelDetial: '酒店崇尚自然生活，在忆泊静享生活1', // 酒店文字介绍
        headHotelName: '忆泊城市艺术酒店1', //  酒店name
        hotelName: '(古墩路店)',  
        longitude: '111', // 经度
        latitude: '222',// 纬度
        checkHotelId: 0// 酒店id
      },
      hotelDetialList: [],
      type: "family"
    }
  },
  components: {
    mpvuePicker
  },
  onLoad() {
    this.getHotelsAll();
    this.getToday(); // 设置时间
    this.dateStart = this.$base.formatDay(new Date());
    this.dateEnd = this.$base.formatNextDay(new Date());
  },
  methods: {
    checkHotel(val = -1) {
      this.isactive = val;
    },
    changeShow(type = '') {
      this.type = type;
      if (type == 'local') {
      } else if (type == 'detial') {

      }
    },
    getHotelsAll() { // 查询所有酒店
      this.$http.get('/hotels/all', {}).then((res = {}) => {
        console.log(res, 'res');
        const { data = [] } = res;
        const newData = data.map((item = {}) => {
          var { id: value = '', headHotelName = '', hotelName = '' } = item;
          const label = `${headHotelName}(${hotelName})`
          const items = {
            value,
            label
          }
          return items
        })
        this.pickerValueArray = newData;
      }).catch(res => {
        console.log(res, 'err')
      })
    },
    toReserve(id = '', unoccupied = 1, item ) { //  点击预定跳转
      const { 
        pickerLabelDefault = '', // 酒店名
        dateStart = '', // 入住日
        dateEnd = '', //  离店日

       } = this.$data;
      console.log(item, 'item', pickerLabelDefault, dateStart, dateEnd )
      const newItem = {
        ...item,
        id: id,
        pickerLabelDefault: pickerLabelDefault,
        dateStart: dateStart,
        dateEnd: dateEnd,
        unoccupied
      }
      wx.navigateTo({
        url: `../reserve-detial/index?item=${JSON.stringify(newItem)}`
      })
    },
    getHotelDetial() { // 酒店详情
      const { pickerValueDefault: hotelId = '', dateStart = '', dateEnd = '' } = this.$data;
      const params = {
        hotelId,
        checkInTime: dateStart,
        checkOutTime: dateEnd
      }
      this.$http.post('/roomTypes/accord/roomType', params).then((res = {}) => {
        console.log(res, 'res2');
        const { data = [] } = res;
        this.hotelDetialList = data;
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    checkHotelDetial () {
      const { pickerValueDefault: hotelId = '' } = this.$data;
      const params = {
        hotelId
      }
      this.$http.get('/hotels/detail', params).then((res = {}) => {
        const { code = -1, data = {}, msg = '' } = res;
        if (code == 0) {
          const { imgUrls = [], detail : hotelDetial = '', headHotelName = '',
            hotelName = '', longitude = '', latitude = '', hotelId: checkHotelId = ''
          } = data;
          console.log(data, 'data')
          const { hotelMsg = {} } = this.$data;
          this.hotelMsg = {
            ...hotelMsg,
            hotelImg: imgUrls,
            hotelDetial,
            hotelName,
            longitude,
            latitude,
            checkHotelId,
            headHotelName
          }
        } else {
          console.log(msg, 'msg')
          this.hotelMsg = {}
          this.$base.toast(msg);
        }
        
        console.log(res, 'res');
        
      }).catch(res => {
        console.log(res, 'err')
      })
    },
    getToday(val, bol = false, endDateGetTime = 0, nextDateGetTime = 0){
      if (bol) {// 如果是结束日期触发的
        const endDate = this.$base.checkDate(val)
        this.endDate = endDate
      } else {
        let myDate;
        myDate = val || new Date();
        const nextDate = new Date(myDate).getTime() + 1000*60*60*24;
        const startDate = this.$base.checkDate(myDate);
        const endDate = this.$base.checkDate(nextDate);
        if (endDateGetTime <= nextDateGetTime) {
          this.endDate = endDate;
        }
        this.startDate = startDate;
        if (!val) {
          this.pickerStart = myDate;
        }
        this.pickerEnd = new Date(nextDate);
      }
      // let myDate;
      // if (val) {
      //   if (!bol) {
      //     myDate = new Date(val);
      //   } else {
      //     console.log(this.dateStart)
      //     myDate = new Date(this.dateStart);
      //   }
      // } else {
      //   myDate = new Date();
      //   this.pickerStart = myDate;
      //   // this.pickerEnd = myDate;
      //   this.pickerEnd = this.$base.formatNextDay(new Date())
      //   console.log(myDate, this.$base.formatNextDay(new Date()), '===========================')
      // }
      // let nextDate = myDate;
      // if (!bol) {
      //   nextDate = +myDate + 1000*60*60*24;
      //   nextDate = new Date(nextDate)
      // } else {
      //   nextDate = new Date(val)
      // }
      // console.log(myDate, nextDate)
      // let myMonth = myDate.getMonth() + 1;
      // let nextMonth = nextDate.getMonth() + 1;
      // const weekArr = new Array("日", "一", "二", "三", "四", "五", "六");  
      // if (myMonth < 10) {
      //   myMonth = '0'+ myMonth;  //补齐
      // }
      // if (nextMonth < 10) {
      //   nextMonth = '0'+ nextMonth;  //补齐
      // }
      // let mydate = myDate.getDate();
      // let nextdate = nextDate.getDate();
      // if (myDate.getDate() < 10) {
      //     mydate = '0'+ myDate.getDate();  //补齐
      // }
      // if (nextDate.getDate()<10) {
      //     nextdate = '0'+ nextdate.getDate();  //补齐
      // }
      // const myWeek = myDate.getDay()
      // const nextWeek = nextDate.getDay()
      // const today = `${myMonth}月${ mydate }日 (周${weekArr[myWeek]})`;
      // const nextday = `${nextMonth}月${ nextdate }日 (周${weekArr[nextWeek]})`;
      // this.startDate = today
      // this.endDate = nextday
    },
    bindDateChangeStart(even) { // 开始日期
      console.log(even, 'evne')
      const { value } = even.target;
      const { dateEnd } = this.$data;// 拿取结束日期，如果结束日期小于当前选择的下一个日期的事件戳，那么结束日期要修改
      console.log(dateEnd, 'dateEnd')
      const endDateGetTime = new Date(dateEnd).getTime();// 结束日期的时间戳
      const nextDateGetTime = new Date(value).getTime() + 1000*60*60*24;// 下一日的时间戳
      console.log(endDateGetTime, nextDateGetTime,(endDateGetTime - nextDateGetTime), '========================', (endDateGetTime < nextDateGetTime))
      if ((endDateGetTime - nextDateGetTime) < 0) {
        console.log((endDateGetTime < nextDateGetTime))
        console.log('1111111111111111111111')
        this.dateEnd = this.$base.formatDay(new Date(nextDateGetTime))
      }
      this.dateStart = value;
      // this.pickerStart = value;
      this.pickerEnd = value;
      console.log(value, this.pickerEnd);
      this.getToday(value, false, endDateGetTime, nextDateGetTime)
    },
    bindDateChangeEnd(even) { // 结束日期
      const { value } = even.target;
      this.dateEnd = value;
      this.getToday(value, true)
    },
    changeHotel(e) {// select选择框数据切换
      console.log(e);
      const { value: pickerValueDefault = '' } = e.target;
      const { pickerValueArray = [] } = this.$data;
      this.pickerValueDefault = pickerValueArray[pickerValueDefault].value || '';
      const pickerLabelDefault = pickerValueArray[pickerValueDefault].label || ''
      this.pickerLabelDefault = pickerLabelDefault;
      this.checkHotelDetial();
    },
    searchHotel() { // 点击搜索按钮
      const { endDate, startDate, houseNums, personNums, pickerValueDefault } = this.$data;
      if (this.$base.isNull(pickerValueDefault)) {
        this.$base.toast('请选择酒店')
      } else if (this.$base.isNull(startDate)) {
        this.$base.toast('请选择入住日期')
      } else if (this.$base.isNull(endDate)) {
        this.$base.toast('请选择退房日期')
      } else if (this.$base.isZero(personNums)) {
        this.$base.toast('请填写要租住的人数')
      } else if (this.$base.isZero(houseNums)) {
        this.$base.toast('请填写房间数')
      } else {
        this.getHotelDetial()
      }
    }
  }
}
</script>
