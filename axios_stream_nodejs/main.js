const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');


const main = async () => { try {

  const fd = new FormData;
  fd.append('image', fs.createReadStream('./test.jpg'));
  fd.append('resolver', 'instagram');
  // await axios({
  //   method: 'post',
  //   url: 'https://api.hashsnap.net/posts/upload/05ffe129-2c85-44a3-9478-5b59505802fc',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   data: fd,
  // });
  axios.post('https://api.hashsnap.net/posts/upload/05ffe129-2c85-44a3-9478-5b59505802fc', fd, {
    headers: fd.getHeaders(),
  });
} catch (error) {
throw Error(error)
}}
main()

// method: POST
// host: https://api.hashsnap.net/posts/upload/<projectUid>
// headers: {'Content-type': 'application/json'}
// body: { image: file, resolver: 'instagram' }|