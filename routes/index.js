const express = require('express');
const router = express.Router();
const io = require('socket.io')();
const path = require('path');

 router.get('*', function(req, res, next) {
  res.sendFile(path.resolve('/app','ai-unit/build/index.html'));
});

io.on('connection', (client) =>{
	console.log('Client Connected!')
})
const port = process.env.port || 1337
io.listen(port)
console.log('listening on port %j', port)
io.on('error', (error) => {
	console.log(error)
})

module.exports = router;
