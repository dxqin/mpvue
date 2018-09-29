var moment = require('moment')

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDate (value, style) {
  var innerValue
  innerValue = value || 0
  return moment(innerValue * 1000).format(style)
}

// 订单列表订单状态
export function orderStatus (value) {
  var input
  input = value || 0
  switch (true) {
    case input === 1000:
      input = "待付款"
      break
    case input === 2000:
      input = "待发货"
      break
    case input === 2001:
      input = "商品退款中"
      break
    case input === 3000:
      input = "已发货"
      break
    case input === 3003:
      input = "商品退货中"
      break
    case input === 4000:
      input = "交易成功"
      break
    case input === 4003:
      input = "商品售后中"
      break
    case input === -1000:
      input = "交易取消"
      break
  }
  return input
};

export function detailOrderStatus (value) {
  var input
  input = value || 0
  switch (true) {
    case input === 1000:
      input = '待付款…'
      break
    case input === 2000:
      input = '待发货…'
      break
    case input === 3000:
      input = '已发货'
      break
    case input === 4000:
      input = '订单完成'
      break
    case input === -1000:
      input = '交易取消'
      break
    case input === -2000:
      input = '管理取消'
      break
  }
  return input
};

//订单详情商品状态
export function itemStatus (value) {
  var input;
  input = value || 0;
  switch (true) {
    case input === 1000:
      input = "";
      break;
    case input === 2000:
      input = "退款";
      break;
    case input === 2001:
      input = "退款中";
      break;
    case input === 2002:
      input = "退款驳回";
      break;
    case input === 3000:
      input = "退货";
      break;
    case input === 3001:
      input = "退货中";
      break;
    case input === 3002:
      input = "退货中";
      break;
    case input === 3003:
      input = "退货中";
      break;
    case input === 3004:
      input = "申请售后";
      break;
    case input === 4000:
      input = "申请售后";
      break;
    case input === 4001:
      input = "售后中";
      break;
    case input === 4002:
      input = "售后中";
      break;
    case input === 4003:
      input = "售后中";
      break;
    case input === 4004:
      input = "售后驳回";
      break;
    case input === -1001:
      input = "";
      break;
    case input === -1002:
      input = "";
      break;
    case input === -1003:
      input = "退款完成";
      break;
    case input === -1004:
      input = "退货完成";
      break;
    case input === -1005:
      input = "售后完成";
      break;
    case input === -2000:
      input = "管理取消";
      break;
  }
  return input;
};

export default {
  moment,
  formatNumber,
  formatTime,
  formatDate,
  orderStatus,
  detailOrderStatus,
  itemStatus
}
