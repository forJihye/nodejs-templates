module.exports = (app, router) => {
  router.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });
  router.get('/user/:id', function (req, res, next) {
    if (req.params.id == 0) next('route');
    else next();
  }, function (req, res, next) {
    res.json({data: req.params.id});
  });
  // router.get('/user/:id', function (req, res, next) {
  //   console.log(req.params.id);
  //   res.json({data: req.params.id});
  // });
  router.post('/login', (req, res) => {
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

}