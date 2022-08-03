//首先加载express
const express = require("express")

const { http } = require('./service')
const { getSign } = require('./utils')

const app = express()
//端口号
const port = 3000

//这里仅列举发送GET请求
app.get("/get", (req, res) => {
  const query = {
    mchId: '1658999813335',
    orderNo: '1659428896008',
  }
  const sign = getSign(query)
  let urlencoded = new URLSearchParams();
  Object.entries({
    ...query,
    sign
  }).forEach((ele) => {
    urlencoded.append(ele[0], ele[1].toString())
  })
  http('qpayorder', {
    body: urlencoded
  }).then((response) => {
    console.log(response, new Date().toLocaleString())
    res.send(response)
  })
})

app.listen(port, () => console.log("server is start,port is", port, new Date().toLocaleString()))
