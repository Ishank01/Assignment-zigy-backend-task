
// ISHANK GUPTA
// Backend Task-Zigy
// 01ishankgupta@gmail.com

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('video'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

// Stream route
app.get('/stream/:filename', (req, res) => {
  const filePath = `./uploads/${req.params.filename}`;
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Download route
app.get('/download/:filename', (req, res) => {
  const filePath = `./uploads/${req.params.filename}`;
  res.download(filePath, err => {
    if (err) {
      console.log('Error downloading file: ', err);
      res.status(500).send({ message: 'Error downloading file' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
