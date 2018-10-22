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

export default {
  formatNumber,
  formatTime,
  isPhone,
  isNull,
  toast,
  setTitle,
  isZero
}
