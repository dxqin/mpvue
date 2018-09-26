export function navigate (url, type) {
  switch (type) {
    case 'navigate':
      wx.navigateTo({url: url})
      break
    case 'switchTab':
      wx.switchTab({url: url})
      break
    case 'redirect':
      wx.redirectTo({url: url})
      break
    default:
      wx.navigateTo({url: url})
      break
  }
}

export function showModal (params) {
  wx.showModal(params)
}

export function showToast (params) {
  wx.showToast(params)
}

export default {
  navigate,
  showModal,
  showToast
}
