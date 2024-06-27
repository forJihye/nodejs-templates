const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const router = express.Router();
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.use(express.static('public'));
app.use(session({
  secret: '#@#@#@#@',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24*2}
}));

// const router = require('./router/main')(app, fs, route);
const routers = require('./router/router')(app, router);
app.use('/', routers);

// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'MY HOMEPAGE',
//     length: 5
//   })
// })

// app.get('/list', (req, res) => {
//   fs.readFile('./data/user.json', 'utf8', (err, data) => {
//     if(err) console.log(err)
//     console.log(data)
//     res.end(data)
//   })
// })

// app.get('/getUser/:username', (req, res) => {
//   fs.readFile('./data/user.json', 'utf8', (err, data) => {
//     if(err) console.log(err)
//     const users = JSON.parse(data);
//     res.json(users[req.params.username])
//   })
// }); 

// app.post('/addUser/:username', (req, res) => {
//   const {username} = req.params;
//   const {name, password} = req.body;
//   if(!name || !password) return res.json({status: 'ERROR', message: 'invalid request'});
//   fs.readFile('./data/user.json', 'utf8', (err, data) => {
//     if(err) console.log(err)
//     const users = JSON.parse(data);
//     if(users[username]) return res.json({status: 'ERROR', message: 'duplicate user'})
//     users[username] = req.body;
//     fs.writeFile('./data/user.json', JSON.stringify(users, null, '\t'), 'utf8', (err, data) => {
//       if(err) console.log(err)
//       res.json({status: 'SUCCESS', data: users});
//     })
//   })
// });

// app.delete('/deleteUser/:username', (req, res) => {
//   const {username} = req.params;
//   fs.readFile('./data/user.json', 'utf8', (err, data) => {
//     if(err) console.log(err)
//     const users = JSON.parse(data);
//     if(!users[username]) return res.json({status: 'ERROR', message: 'not found'});
//     delete users[username]
//     fs.writeFile('./data/user.json', JSON.stringify(users, null, '\t'), 'utf8', (err, data) => {
//       if(err) console.log(err)
//       res.json({status: 'SUCCESS', data: users});
//     })
//   })
// });

app.listen(3000, () => console.log('http://localhost:3000'))