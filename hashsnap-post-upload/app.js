const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const directoryPath = path.join(__dirname, 'image/');
fs.readdir(directoryPath, (err, files) => {
  if(err) return console.error(err);
  files.map(async(file) => {
    try{
      const fd = new FormData;
      fd.append('image', fs.createReadStream(`image/${file}`));
      fd.append('resolver', 'instagram');
      await axios.post(`https://api.hashsnap.net/posts/upload/3fb6d6ce-efbe-48a8-a1f4-ce6606dd8c08`, fd, {
        headers: fd.getHeaders()
      });
    }catch(err){
      throw Error(err)
    }
  });
});
