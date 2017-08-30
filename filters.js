function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}


export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (!time || arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }


  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date = new Date(time);
  if (typeof time == 'object') {
    date = time;
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  console.log(format)
  let test = new RegExp('{(y|m|d|h|i|s|a)+}', 'g');
  const time_str = format.replace(test, function(result, key) {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  // time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      let test = new RegExp('\.0+$|(\.[0-9]*[1-9])0+$');

      return (num / si[i].value + 0.1).toFixed(digits).replace(test, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}


export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

// 给数字加逗号分隔符
export function toThousandFilter(num) {
  let test = new RegExp('(\d)(?=(?:\d{3})+$)', 'g');

  return (+num || 0).toString().replace(test, '$1,');
}

// 数字转万单位
export function toWanFilter(num) {
  return Math.round(+num || 0) / 10000;
}

// 取整
export function floor(num) {
  return Math.floor(+num || 0)
}

// 取字符串的前几位
export function stringLeft(str, num) {
  return str ? str.slice(0, (num || 8)) : '';
}

export function toFixed(str, reserved) {
  // 本函数支持能转成数字的字符串
  let accounting = require('accounting/accounting.min.js');
  let num = +str;
  if (typeof str === 'boolean' || typeof str === 'undefined' || typeof str === 'object'
    || str === '' || Number.isNaN(num)) {
    // 如果num是个无法转成数字的字符串, bool值直接返回
    return str;
  }

  let numArray = (num + '').split('.');
  if (numArray.length > 1) { /* 有小数*/
    if (numArray[1] * 1 === 0) {   /* 小数部分为0，直接输出整数部分 */
      return numArray[0];
    }
    return accounting.toFixed(num, reserved || 2);
    /* 小数部分不为0，输出四舍五入 */
  } else {  /* 只有整数，直接输出整数部分 */
    return numArray[0]
  }
}
