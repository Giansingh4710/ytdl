const ytdl = require('ytdl-core')
const express = require('express')
const app = express()
app.use(express.json()) // to support JSON-encoded bodies
app.use(express.urlencoded()) // to support URL-encoded bodies

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://45.76.2.28')
  // You can set other CORS headers here as needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
app.listen(1313, () => {
  console.log('Server is running on port 1313')
})

app.post('/', (req, res) => {
  const postData = req.body
  const url = postData.url
  downloadVideo(url).then((data) => {
    res.status(200).json({
      serverReceived: req.body,
      title: data.title,
      formats: data.formats,
    })
  })
})

const url = 'https://www.youtube.com/watch?v=ungkoUHIs7Y'
async function downloadVideo(url) {
  if (!ytdl.validateURL(url)) {
    console.log('URL not valid')
    return {}
  }
  const info = await ytdl.getInfo(url)
  const title = info.videoDetails.title
  const formats = []
  for (let vid of info.formats) {
    formats.push({
      itag: vid.itag,
      mimeType: vid.mimeType,
      url: vid.url,
      hasAudio: vid.hasAudio,
      hasVideo: vid.hasVideo,
    })
  }
  return { title, formats }
}

app.get('/', (req, res) => {
  res.send('Get Received: ')
})
