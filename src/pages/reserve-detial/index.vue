<template>
  <div class="reserve-detial w-full h-full pos-re">
    <div class="reserve-modal">
      <div class="modal-back w-full h-full"></div>
      <div class="bg-img-box jc-c dis-flex">
        <img :src="imgUrls[0]" class="modal-bg-img" alt="">
      </div>
    </div>
    <div class="reserve-detial-content bsbb bgfff">
      <div class="content-header pl40 f14 c3b ptb16">
        {{roomPriceName}}
      </div>
      <div class="swiper-box pos-re">
        <swiper :indicator-dots="indicatorDots"
          class="swiper"
          :autoplay="autoplay" :interval="interval" :duration="duration"
          @change="changeSwiper"
        >
          <block v-for="(item, index) in imgUrls" :key="index">
            <swiper-item>
              <image :src="item" class="slide-image" />
            </swiper-item>
          </block>
        </swiper>
        <div class="current-box pos-ab jc-c dis-flex">
          <p class="current-item br10 cfff f12 tc aic">{{current}}/ {{imgUrls.length}}</p>
        </div>
      </div>
      <div class="config-detial pl30 pr30">
        <div>
          <div class=" weui-panel_access pt30">
            <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_appmsg pt10 pb10">
                <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                  <div class='w50 dib f12 c999' v-for="(item, index) in apartDetialNums" :key="index">
                    <span class="cb4 f14"> {{item.text}}</span>
                    <span class="c3b f14 plr24">{{apartDetialNum[item.val] || '未知'}}</span>
                  </div>
                  <div class='w50 dib f12 c999'>
                    <span class="cb4 f14">窗户</span>
                    <span class="c3b f14 plr24">{{apartDetialNum['window'] ? '有窗户' : '无窗户'}}</span>
                  </div>
                  <div class='w50 dib f12 c999'>
                    <span class="cb4 f14">网络</span>
                    <span class="c3b f14 plr24">{{apartDetialNum['wifi'] ? '免费wifi' : '无'}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reserve-bottom bgfff bsbb pl60 pr60 dis-flex jc-bet aic pos-ab">
        <div class="dis-flex aic">
          <span class="f14 cb4">1晚总价</span>
          <span class="c-app c18 pl20">¥{{price}}</span>
        </div>
        <div class="reserve-btn app-btn tc br10 f14"  @click="reserveOrder">
          预定
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
      imgSrc: "http://pic14.nipic.com/20110605/1369025_165540642000_2.jpg",
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      apartDetialNums: [
        { text: '面积', val: 'area' },
        { text: '可住', val: 'tenantable' },
        { text: '楼层', val: 'floor' },
        { text: '床型', val: 'bedStatus' },
      ],
      apartSpecialNums: [
        { text: '窗户', val: 'window' },
        { text: '网络', val: 'wifi'}
      ],
      apartDetialNum: {
        area: '',
        tenantable: '',
        floor: '',
        bedStatus: '',
        window: '',
        wifi: ''
      },
      current: 1,
      roomTypeId: '', // 房型id
      roomPriceName: '云舍大床房（活动2）',
      price: 1,
      detial: {}
    }
  },
  methods: {
    changeSwiper(even) {
      const { current = 1 } = even.target;
      this.current = parseInt(current) + 1
    },
    reserveOrder() {
      const { roomTypeId, detial } = this.$data;
      const newDetial = {
        ...detial,
        roomTypeId: roomTypeId,
      }
      wx.navigateTo({
        url: `../../pages/reserve-order/index?newDetial=${JSON.stringify(newDetial)}`
      })
    },
    getRoomTypesDetial() { // 房型详情信息
      const { roomTypeId } = this.$data;
      const params = {
        roomPriceId: roomTypeId,
      }
      this.$http.get('/roomTypes/detail/roomType', params).then((res = {}) => {
        const { data = {} } =  res;
        const { 
          roomPriceName = '未知',
          imgUrls = [],
        } = data;

        this.roomPriceName = roomPriceName;
        this.imgUrls = imgUrls;
        this.apartDetialNum = data;
        console.log(res, 'res')
      }).catch((err) => {
        console.log(err, 'err')
      })
    }
  },
  onLoad(options) {
    console.log(options, 'options' )
    const { item } = options;
    const items = JSON.parse(item);
    const { id = '', price = 1 } = items;
    this.roomTypeId = id;
    this.price = price;
    this.detial = items;
    this.getRoomTypesDetial()
  }
}
</script>

