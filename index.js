const ytdl = require('ytdl-core')
const express = require('express')
const app = express()

const cors = require('cors')
const corsOptions = {
  origin: 'http://127.0.0.1:1313',
}
app.use(cors(corsOptions))

app.listen(1313)
app.get('/', (req, res) => {
  res.send('Get Received: ')
})
app.post('/', (req, res) => {
  let data = req.body
  res.send('Data Received: ' + JSON.stringify(data))
})


const url = 'https://www.youtube.com/watch?v=ungkoUHIs7Y'

async function downloadVideo(url) {
  if (!ytdl.validateURL(url)) {
    console.log('URL not valid')
    return
  }
  const info = await ytdl.getInfo(url)
  const title = info.videoDetails.title
  data = []
  for (let vid of info.formats) {
    data.push({
      itag: vid.itag,
      mimeType: vid.mimeType,
      url: vid.url,
      hasAudio: vid.hasAudio,
      hasVideo: vid.hasVideo,
    })
  }
  console.log(data.length)
  return data
}
// downloadVideo(url)
