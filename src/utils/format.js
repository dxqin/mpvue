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

// 订单列表订单状态 0:预定中；1:预定成功；2:预定取消；3:已入住；4:已完成
export function orderStatus (value) {
  var input
  input = value || 0
  switch (true) {
    case input === 0:
      input = "预定中"
      break
    case input === 1:
      input = "预定成功"
      break
    case input === 2:
      input = "预定取消"
      break
    case input === 3:
      input = "已入住"
      break
    case input === 4:
      input = "已完成"
      break
  }
  return input
};

// export function detailOrderStatus (value) {
//   var input
//   input = value || 0
//   switch (true) {
//     case input === 1000:
//       input = '待付款…'
//       break
//     case input === 2000:
//       input = '待发货…'
//       break
//     case input === 3000:
//       input = '已发货'
//       break
//     case input === 4000:
//       input = '订单完成'
//       break
//     case input === -1000:
//       input = '交易取消'
//       break
//     case input === -2000:
//       input = '管理取消'
//       break
//   }
//   return input
// };



export default {
  moment,
  formatNumber,
  formatTime,
  formatDate,
  orderStatus,
  // detailOrderStatus,
}
