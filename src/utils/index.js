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

export function formatDay (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const t1 = [year, month, day].map(formatNumber).join('-')

  return `${t1}`
}

export function formatNextDay (date) {
  const today = date.getTime();
  console.log(date, 'date', today)
  const nextDateTime = + today + 1000*60*60*24;
  const nextDate = new Date(nextDateTime)
  const year = nextDate.getFullYear()
  const month = nextDate.getMonth() + 1
  const day = nextDate.getDate()

  const t1 = [year, month, day].map(formatNumber).join('-')

  return `${t1}`
}

export function formatDate (value, style) {
  var innerValue
  innerValue = value || 0
  return moment(innerValue * 1000).format(style)
}

const isPhone = (value) => {
  const isPhoneNum = RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)
  if (isPhoneNum.test(value)) return true
  else return false
}

const isNull = (value) => {
  if(typeof value == "undefined" || value == null || value == ""){
    return true;
  }else{
    return false;
  }
}

const isZero = (value) => {
  let zero = true;
  if (typeof value == "undefined" || value == null || value == "") {
    zero = true
  } else if(parseInt(value) > 0) {
    zero = false
  }
  return zero
}

const toast = (title, type = 'none', time = 3000) => { // toast提示
  setTimeout(() => {
    wx.showToast({
      title: title,
      icon: `${type}`,
      duration: time
    })
  }, 300)
}

const setTitle = (title) => { // 设置title
  wx.setNavigationBarTitle({
    title: title
  })
}

const checkDate = (val) => {
  const weekArr = ['七', '一', '二', '三', '四', '五', '六', '七']
  const date = new Date(val);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = date.getDay();
  const checkDates = `${month}月${day}日周${weekArr[week]}`
  return checkDates
}

export default {
  formatNumber,
  formatTime,
  formatDate,
  formatDay,
  formatNextDay,
  isPhone,
  isNull,
  toast,
  setTitle,
  isZero,
  checkDate
}
