const CryptoJS = require('crypto-js')

// 生成签名
exports.getSign = function(params) {
  const key = 'XRHBRTPCO9HAHD2SFLATL1LML5W0RIXNMHRCUQZ3JUIOCUC13SLJDE0DFQYNZW9DC3YMXXWMSOFYUTALHE53JJI7OZGGMBOSY6NTGCWB0ZIHL3U1LCJN3TS0K2Z2KGVP'
  let attrArr = Object.entries(params)
  attrArr = attrArr.sort((m, n) => (m[0].localeCompare(n[0])))
  let snStr = ''
  attrArr.forEach((ele) => {
    snStr += `${ele[0]}=${ele[1]}&`
  })
  snStr += `key=${key}`
	const sn = CryptoJS.MD5(snStr).toString()
  return sn
}
