module.exports = (app, fs, route) => {
  // app.use('/login', (req, res, next) => {
  //   console.log('Request URL:', req.originalUrl);
  //   next();
  // }, (req, res, next) => {
  //   console.log('Request Type:', req.method);
  //   next();
  // });
  app.use('/', (req, res, next) => {
    if(!req.session.username){
      console.log('logged out');
      next();
    }else{
      console.log('logged in');
      next();
    }
  })
  
  app.get('/', (req, res) => {
    const session = req.session;
    res.json({name: session.name, username: session.username});
    // res.render('index', {
    //   title: 'MY HOMEPAGE',
    //   length: 5,
    //   name: session.name,
    //   username: session.username
    // });
  })
  
  app.get('/list', (req, res) => {
    fs.readFile('./data/user.json', 'utf8', (err, data) => {
      if(err) console.log(err)
      console.log(data)
      res.end(data)
    })
  })
  
  app.get('/getUser/:username', (req, res) => {
    fs.readFile('./data/user.json', 'utf8', (err, data) => {
      if(err) console.log(err)
      const users = JSON.parse(data);
      res.json(users[req.params.username])
    })
  }); 
  
  app.post('/addUser/:username', (req, res) => {
    const {username} = req.params;
    const {name, password} = req.body;
    if(!name || !password) return res.json({status: 'ERROR', message: 'invalid request'});
    fs.readFile('./data/user.json', 'utf8', (err, data) => {
      if(err) console.log(err)
      const users = JSON.parse(data);
      if(users[username]) return res.json({status: 'ERROR', message: 'duplicate user'})
      users[username] = req.body;
      fs.writeFile('./data/user.json', JSON.stringify(users, null, '\t'), 'utf8', (err, data) => {
        if(err) console.log(err)
        res.json({status: 'SUCCESS', data: users});
      })
    })
  });
  
  app.delete('/deleteUser/:username', (req, res) => {
    const {username} = req.params;
    fs.readFile('./data/user.json', 'utf8', (err, data) => {
      if(err) console.log(err)
      const users = JSON.parse(data);
      if(!users[username]) return res.json({status: 'ERROR', message: 'not found'});
      delete users[username]
      fs.writeFile('./data/user.json', JSON.stringify(users, null, '\t'), 'utf8', (err, data) => {
        if(err) console.log(err)
        res.json({status: 'SUCCESS', data: users});
      })
    })
  });

  app.post('/login', (req, res) => {
    const session = req.session;
    const {name, password} = req.body;
    fs.readFile(__dirname+'/../data/user.json', 'utf8', (err, data) => {
      if(err) console.log(err);
      const users = JSON.parse(data)
      if(!users[name]) return res.status(404).json({message: 'user not found'});
      if(users[name]["password"] === password){
        session.username = name;
        session.name = users[name]["name"];
        res.json(true);
      }else res.json(false);
    });
  });

  app.get('/logout', (req, res) => {
    const session = req.session;
    if(session.username){
      req.session.destroy(err => {
        if(err) console.log(err)
        res.redirect('/');
      });
    }else{
      res.redirect('/'); 
    }
  })
}