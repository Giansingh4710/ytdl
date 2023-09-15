const ytdl = require('ytdl-core')
const express = require('express')
const app = express()
const bodyParser = require('body-parser'); // To parse JSON data in the request body

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://45.76.2.28');
  // You can set other CORS headers here as needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.listen(1313, () => {
  console.log('Server is running on port 1313');
});

app.post('/', (req, res) => {
  const postData = req.body; // This contains the data sent in the POST request body
  console.log(postData)
  res.status(200).json({ 
    message: 'Data received successfully',
    serverReceived : req.body,
    //req: JSON.stringify(req)
  });
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

app.get('/', (req, res) => {
  res.send('Get Received: ')
})

