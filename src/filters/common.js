'use strict';


// 字符串的截取
export const substr = function(value, length, modifier) {
  var output, innerModifier;
  innerModifier = modifier || '';
  output = value + '';
  if (output.length > length) {
    output = output.substring(0, length);
    output += innerModifier
  }
  return output
};

// 日期转换
export const formatDate = function(value, style) {
  var innerValue;
  innerValue = value || 0;
  return moment(innerValue * 1000).format(style);
};

// 字符串的截取,向前截取
export const foreSubstr = function(value, length, modifier) {
  var output, innerModifier, len;
  innerModifier = modifier || '';
  output = value + '';
  len = output.length;
  if (len > length) {
    output = output.substring(len - length, len);
    output = innerModifier + output;
  }
  return output
};

//购物车商品状态
export const cartStatus = function(value) {
  var input;
  input = value || 0;
  switch (input) {
    case 0:
      input = "已下架";
      break;
    case 1:
      input = "已售罄";
      break;
    case 2:
      input = "预热中";
      break;
    case 3:
      input = "库存不足";
      break;
    case 4:
      input = "正常";
      break;
    default:
  }
  return input;
};

//个人中心提现状态
export const withdrawStatus = function(value) {
  var input;
  input = value || 0;
  switch (input) {
    case -1:
      input = "提现失败";
      break;
    case 0:
      input = "待审核";
      break;
    case 1:
      input = "提现成功";
      break;
  }
  return input;
};

//订单列表订单状态
export const orderStatus = function(value) {
  var input;
  input = value || 0;
  switch (true) {
    case input === 1000:
      input = "待付款";
      break;
    case input === 2000:
      input = "待发货";
      break;
    case input === 2001:
      input = "商品退款中";
      break;
    case input === 3000:
      input = "已发货";
      break;
    case input === 3003:
      input = "商品退货中";
      break;
    case input === 4000:
      input = "交易成功";
      break;
    case input === 4003:
      input = "商品售后中";
      break;
    case input === -1000:
      input = "交易取消";
      break;
  }
  return input;
};


//订单详情订单状态
export const detailOrderStatus = function(value) {
  var input;
  input = value || 0;
  switch (true) {
    case input === 1000:
      input = "待付款…";
      break;
    case input === 2000:
      input = "待发货…";
      break;
    case input === 3000:
      input = "已发货";
      break;
    case input === 4000:
      input = "订单完成";
      break;
    case input === -1000:
      input = "交易取消";
      break;
    case input === -2000:
      input = "管理取消";
      break;
  }
  return input;
};

//订单详情商品状态
export const itemStatus = function(value) {
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
      input = "";
      break;
    case input === 4000:
      input = "";
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

//订单商品状态
export const orderItemStatus = function(value) {
  var input;
  input = Number(value) || 0;
  switch (input) {
    case 1000:
      input = "待付款";
      break;
    case 2000:
      input = "待发货";
      break;
    case 2001:
      input = "申请退款";
      break;
    case 2002:
      input = "退款驳回";
      break;
    case 3000:
      input = "已发货";
      break;
    case 3001:
      input = "申请退货";
      break;
    case 3002:
      input = "同意退货";
      break;
    case 3003:
      input = "退货中";
      break;
    case 3004:
      input = "退货驳回";
      break;
    case 4000:
      input = "交易成功";
      break;
    case 4001:
      input = "申请售后";
      break;
    case 4002:
      input = "同意售后";
      break;
    case 4003:
      input = "售后中";
      break;
    case 4004:
      input = "售后驳回";
      break;
    case -1000:
      input = "交易取消";
      break;
    case -1001:
      input = "用户取消";
      break;
    case -1002:
      input = "超时取消";
      break;
    case -1003:
      input = "退款完成";
      break;
    case -1004:
      input = "退货完成";
      break;
    case -1005:
      input = "售后完成";
      break;
    case -2000:
      input = "管理取消";
      break;
  }
  return input;
};

//订单商品状态（粉丝销售额）
export const orderItem = function(value) {
  var input;
  input = value || 0;
  switch (input) {
    case 1000:
      input = "待付款";
      break;
    case 2000:
      input = "待发货";
      break;
    case 2001:
      input = "申请退款";
      break;
    case 2002:
      input = "退款驳回";
      break;
    case 3000:
      input = "已发货";
      break;
    case 3001:
      input = "申请退货";
      break;
    case 3002:
      input = "同意退货";
      break;
    case 3003:
      input = "退货中";
      break;
    case 3004:
      input = "退货驳回";
      break;
    case 4000:
      input = "交易成功(已到账)";
      break;
    case 4001:
      input = "申请售后";
      break;
    case 4002:
      input = "同意售后";
      break;
    case 4003:
      input = "售后中";
      break;
    case 4004:
      input = "售后驳回(已到账)";
      break;
    case -1000:
      input = "交易取消";
      break;
    case -1001:
      input = "用户取消";
      break;
    case -1002:
      input = "超时取消";
      break;
    case -1003:
      input = "退款完成";
      break;
    case -1004:
      input = "退货完成";
      break;
    case -1005:
      input = "售后完成";
      break;
    case -2000:
      input = "管理取消";
      break;
  }
  return input;
};


// 首页秒杀进度条百分比处理
export const progressValue = function(value) {
  let innerValue;
  innerValue = value || 0;
  return parseInt(innerValue * 100);
};

//小数点过滤器
export const currency = function(value, length) {
  var innerValue; 
  innerValue = Number(value) || 0;
  return innerValue.toFixed(length);
};

//计算间隔时间
export const relativeTime = function(value) {
  let innerValue;
  innerValue = value || 0;
  moment.locale('zh-cn', {
    relativeTime: {
      future: "%s后",
      past: "%s前",
      s: "%d秒",
      m: "%d分钟",
      mm: "%d分钟",
      h: "%d小时",
      hh: "%d小时",
      d: "%d天",
      dd: "%d天",
      M: "%d月",
      MM: "%d月",
      y: "%d年",
      yy: "%d年"
    }
  });
  innerValue = moment(innerValue * 1000).fromNow();
  return innerValue;
}

//优化点赞数量显示
export const readeasy = value => {
  let innerValue;
  innerValue = value || 0;
  if (innerValue >= 10000) {
    innerValue = Math.round(innerValue / 10000 * 10) / 10 + 'W';
  } else if (innerValue >= 1000) {
    innerValue = Math.round(innerValue / 1000 * 10) / 10 + 'K';
  } else {
    innerValue = innerValue;
  }
  return innerValue;
}

//订单商品状态
export const accountType = function(value) {
  var input;
  input = value || 0;
  switch (input) {
    case 0:
      input = "零售收益";
      break;
    case 2:
      input = "礼包收益";
      break;
    case 3:
      input = "培训收益";
      break;
  }
  return input;
};

export const userType = function(value) {
  var input;
  input = value || 0;
  switch (input) {
    case "1":
      input = "代理商";
      break;
    case "2":
      input = "总代";
      break;
  }
  return input;
};

export const agencyType = function(value) {
  var input;
  input = value || 0;
  switch (input) {
    case 0:
      input = "未审核";
      break;
    case 1:
      input = "已审核";
      break;
  }
  return input;
};