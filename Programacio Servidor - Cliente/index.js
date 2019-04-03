
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

var objeto = new Object();

objeto["value1"] = 12;
objeto["value2"] = 21;
objeto["value3"] = 23;
objeto["value4"] = 12;
objeto["value5"] = 22;
objeto["value6"] = 27;
objeto["value7"] = 82;
objeto["value8"] = 21;
objeto["value9"] = 20;
objeto["value10"] = 12;
objeto["value11"] = 21;
objeto["value12"] = 23;
objeto["value13"] = 62;
objeto["value14"] = 21;
objeto["value15"] = 23;
objeto["value16"] = 42;
objeto["value17"] = 21;
objeto["value18"] = 83;
objeto["value19"] = 12;
objeto["value20"] = 21;
objeto["value21"] = 23;
objeto["value22"] = 23;
objeto["value23"] = 23;
objeto["value24"] = 23;
objeto["value25"] = 23;
objeto["value26"] = 23;
objeto["value27"] = 23;
objeto["value28"] = 23;
objeto["value29"] = 23;
objeto["value30"] = 23;
objeto["value31"] = 23;
objeto["value32"] = 23;
objeto["value33"] = 23;
objeto["value34"] = 23;


//-----------------------------------------------------------------------------

// Escuchamos si hay alguna conexion
io.on('connection',function (socket) {
    console.log('[Server]  Nueva conexion con Sockets id: ' + socket.id);


    socket.on('disconnect', function(){
      console.log('[Server]  Usuario Desconectado id: ' + socket.id);
    });

    io.sockets.emit('Servidor',objeto);
    
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
