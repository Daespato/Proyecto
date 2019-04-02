
 const  path = require('path');                                                  // permite trabajar con rutas/ubicaciones
 const  express= require("express");
 const  app = express();

 // Configuracion del servidor
 app.set('port', process.env.PORT|| 1234);
 app.use(express.static('client'));

 // Iniciar el servidor
 const server = app.listen(app.get('port'), function () {
   console.log("[Server]  Servidor Corriendo en puerto", app.get('port'));
 })

// WebSockets
 const  socketio = require('socket.io')
 const io = socketio.listen(server);


//-----------------------------------------------------------------------------

// Escuchamos si hay alguna conexion
io.on('connection',function (socket) {
    console.log('[Server]  Nueva conexion con Sockets id: ' + socket.id);


    socket.on('disconnect', function(){
      console.log('[Server]  Usuario Desconectado id: ' + socket.id);
    });

    socket.on('ModuloWiFi',function (data) {
      console.log("[Server]  Datos desde ESP32:   "+data);
      io.sockets.emit('ModuloWiFi',data);
    })

    socket.on('ModuloWiFi2',function (data) {
      console.log("[Server]  Datos desde ESP8266: "+data);
      io.sockets.emit('ModuloWiFi2',data);
    })

    /*
    socket.on('datos',function (data) {
      console.log("[Server]  Datos desde ModuloWiFi : "+ data);
      io.sockets.emit('datosentrantes2',data);
    });

    socket.on('iniciar',function () {
      var datos= (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
      //console.log('[Server]  Datos enviado a Html  '+datos);
      io.sockets.emit('datosentrantes',datos);
    })

    socket.on('iniciar2',function () {
      //var datos2=0;
      var datos2= (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
      //console.log('[Server]  Datos enviado a Html  '+datos2);
      socket.on('datos',function (data) {

        datos2=data;

      })
      io.sockets.emit('datosentrantes2',datos2);
    })*/


});
