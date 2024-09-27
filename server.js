const data = require('./mock/index.js')
var ws = require('ws')
// 启动基于websocket的服务器,监听我们的客户端接入进来。
var server = new ws.Server({
  host: '127.0.0.1',
  port: 6080,
})

server.on('connection', function (ws) {
  let index = 0
  function sendData() {
    const reserveData = data.cars

    const obj = {
      cars: [reserveData[index]],
      centerCar: null,
      carperceptions: [],
    }
    const json = JSON.stringify(obj)

    console.log('发送消息了', index)
    ws.send(json)

    if (index < reserveData.length) {
      index++
    } else {
      index = 0
    }
  }

  let interval = setInterval(sendData, 5000)

  // close事件
  ws.on('close', function () {
    console.log('client close')
    clearInterval(interval)
  })

  ws.on('error', function (err) {
    console.log('client error', err)
  })

  ws.on('message', function (data) {
    console.log(data, 'data')
  })
})

server.on('error', function (err) {
  console.error(err)
})
