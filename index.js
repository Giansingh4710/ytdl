const express = require('express')
const app = express()
app.listen(1313)

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

app.get('/test', (req, res) => {
  res.json({
    msg: 'Hello',
  })
  console.log('Hello Sent from server')
})
