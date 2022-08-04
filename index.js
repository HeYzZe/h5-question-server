//首先加载express
const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');

const { http } = require('./service')
const { getSign } = require('./utils')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//端口号
const port = 80

//这里仅列举发送GET请求
app.post("/getPayInfo", (req, res) => {
  if (req.body.mchId && req.body.orderNo) {
    const query = {
      mchId: req.body.mchId,
      orderNo: req.body.orderNo,
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
  } else {
    throw new Error('参数错误')
  }
})

function errorHandler(err, req, res, next) {
  res.status(501).json({ error: -1, msg: err.message })
}

app.use(errorHandler)

app.listen(port, () => console.log("server is start,port is", port, new Date().toLocaleString()))
