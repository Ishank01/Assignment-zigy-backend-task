# Assignment-zigy-backend-task
First, we need to install the required dependencies:

`npm install express multer fs`

- Express is a Node.js web application framework.
- Multer is middleware for handling multipart/form-data, which is primarily used for uploading files.
- fs is a Node.js module for interacting with the file system.

## to run the server use

` node server.js `

The code defines three routes:

- /upload: This is a POST route for uploading a video file. It uses Multer middleware to handle the file upload and saves the file to the ./uploads directory.
- /stream/:filename: This is a GET route for streaming a video file. It reads the file from the ./uploads directory and sends it as a stream in response. It also supports streaming partial content using HTTP range headers.
- /download/:filename: This is a GET route for downloading a video file. It sends the file as an attachment in response.

## To test the code

### Uploading a video file:

Open a new terminal window, navigate to the directory where your test.mp4 file is located, and run the following curl command:


` curl -X POST -F video=@test.mp4 http://localhost:3000/upload `


### Streaming a video file:

Use the following curl command to stream the uploaded video file test.mp4:

` curl -I http://localhost:3000/stream/test.mp4 `

enter the URL http://localhost:3000/stream/test.mp4 to play the video.


### Downloading a video file:
Use the following curl command to download the uploaded video file test.mp4:

` curl -OJ http://localhost:3000/download/test.mp4 `

This should download the file to your current working directory.
