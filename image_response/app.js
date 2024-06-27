const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/img', (req, res) => {
  fs.readFile('./7.jpg', (err, data) => {
    if(err) console.log(err);
    res.writeHead(200, {"Content-Type": "image/*"});
    res.write(data);
    res.end();
  });
});

app.listen('3000', () => console.log('http://localhost:3000'));
