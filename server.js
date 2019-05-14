const express = require('express');
const helmet = require('helmet');
const postsRouter = require('./posts/postRouter.js');

const userRouter = require('./users/userRouter.js');
const server = express();
server.use(express.json());


// function logger (url, type){
// return function (req, res, next) {
// req.time = new Date().toISOString();
// req.url = url,
// req.type= type;
//   console.log(req.type, req.url, req.time);
//   next();
// }
// }

//custom middleware
function logger(req, res, next) {
  const seconds = new Date().toISOString();
type= req.headers.type;
 url = req.headers.url;
  console.log(url, type, seconds);
  next();
};





server.use(express.json());
server.use(helmet());
server.use(logger);
// server.use(logger('google', 'user'));
server.use('/api/posts',  postsRouter);



  server.use('/api/users', userRouter);



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


// server.use((err, req, res, next) => {
//   res.status(500).json({message: "bad pooh bear", err});
// })



module.exports = server;
