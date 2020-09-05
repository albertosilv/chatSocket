const app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 3231

const socket = require('./socket')

io.on('connection',socket)

app.listen(PORT, ()=>{
    console.log('Conectado na porta ',PORT)
})