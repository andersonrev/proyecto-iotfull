/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const moment = require('moment');
// importar Modulo Node Js (Usarlo)
// const modulo = require('moduloRaspberry');
const axios = require('axios');

const url = 'http://localhost:1338/';
// npm insal axios

// var sensor2 = 0;
// var sensor4 = 0;
// const Serialport = require('serialport');
// const Readline = Serialport.parsers.Readline;
// const port = new Serialport('/dev/ttyACM0', {
//   baudRate: 9600
// });
//
// const parser = port.pipe(new Readline({delimeter: '\r\n'}));
// parser.on('open', function () {
//   // console.log('conecction is opened');
// });
// parser.on('data', function (data) {
//   //console.log('datica', data);
//   valor = parseInt(data);
//   //console.log('valor', valor);
//   sensor2 = copiar(valor);
//   //sensor4 = copiar(valor);
// });
//
// const copiar = (numero) => {
//   return numero;
// };


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(3000, () => {
  console.log('Servidor escuchando en 3000');
});
//
// function onData(dato) {
//   io.sockets.emit('lectura', dato);
// }
//


/*var app = require('express')();
var http = require('http').createServer(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});*/

const jf = require('johnny-five');
const circuito = jf.Board();

configuracionButton = {
  pin: 2,
  isPullup: true
};

circuito.on('ready', main);

var puertaCerrada = true;
let indicadorEnvioDatos = false;

function main() {

  const button = new jf.Button(configuracionButton);
  const alarma = new jf.Led(12);
  const led = new jf.Led(13);

  io.on('connection', (socket) => {
    console.log('Alguien se conecto');
    //io.sockets.emit('test event', 'hola');
    socket.on('apagar', (msg) => {
      alarma.stop();
      alarma.off();
      puertaCerrada = true;
      console.log('mensajitoDelFront', msg);
      io.sockets.emit('test event', 'Monitoreo');
    });
  });

  // Sensor en contacto
  button.on('down', (value) => {
    led.on();
    puertaCerrada = true;
    // console.log('down', puertaCerrada);
  });

  // Sensor sin contacto Emite el alerta al front_end
  button.on('up', () => {
    led.off();
    alarma.strobe();
    puertaCerrada = false;
    indicadorEnvioDatos = true;
    //console.log('up', puertaCerrada);
    io.sockets.emit('test event', 'alerta');
  });
  // recibirInformacion(puertaCerrada);
}

/////////// FIN DE MAIN


function recibirEstadoPuerta() {
  return puertaCerrada;
  //setTimeout(recibirInformacion, 1000);
  //console.log(valor);
}


circuito.on('error', (error) => {
  console.log(error);
});

const moduloArduino = {
  // calcularProximidad: function () {
  //   return Math.random() * (10 - 0) + 0;
  // }

  armarObjetoHistorial: function () {
    return {
      fecha: moment().format('YYYY-MM-DD'),
      hora: moment().format('LTS'),
      sensor: configuracionButton.pin,
    };
  }
};


module.exports.bootstrap = async function () {

  setInterval( // Ejecutar lo mismo cada dos segundos
    async () => {

      var estadoPuerta = recibirEstadoPuerta();

      const historial = moduloArduino.armarObjetoHistorial();

      // if (estadoPuerta === false) {
      if (estadoPuerta === false) {
        console.log('lo que se va a guardar: ', historial);
        const respuestaServidor = await axios
          .post('http://localhost:1338/loghistorial',
            historial);
        // const respuestaPutAreaSensor = await axios
        //   .put(url + 'areaSensor/1', {
        //     estado: 0
        //   });

        io.sockets.emit('ingreso', historial);

        // console.log('Xvideos', respuestaPutAreaSensor);
      }
    },
    4000 // cada 4 segundos
  );
};
// 1337 : iot
// 1338: backend
// POST http://localhost:1338/MonitoreoMovimiento {'valor': valor}
