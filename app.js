import { SerialPort, ReadlineParser } from 'serialport'
import * as http from 'http'
import * as fs from 'fs'
import {Server} from 'socket.io'



var index = fs.readFileSync('index.html');

const parser = new ReadlineParser();

var port = new SerialPort({ path: '/dev/cu.usbmodem11301', baudRate: 9600 })

port.pipe(parser);


var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = new Server()

io.listen(app);

io.on('connection', function(data){
    console.log("node js is listening")
});

parser.on('data', function(data){
    console.log(data);

    io.emit('data', data);
});

app.listen(3000);
