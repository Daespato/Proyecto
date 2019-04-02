

#include <Arduino.h>
#include "SocketIOClient.h"
#include <ArduinoJson.h>

#define LedPin 2
#define ButtonPin 0

#define ESP8266
//#define ESP32

const char* ssid = "TOBAR";
const char* password = "tobar3623";

//const char* ssid = "gerencia";
//const char* password = "gerencia7336200$";

char host[] = "192.168.2.218";
//char host[] = "192.168.1.7";
int port = 1234;

String JSON;
StaticJsonDocument<200> doc;
JsonObject objeto = doc.to<JsonObject>();

SocketIOClient client;

void setup() {

  pinMode(LedPin,OUTPUT);
  digitalWrite(LedPin,LOW);
  Serial.begin(115200);
  Serial.print("\n\n\n");
  Serial.println("[ModuloWiFi]  Conexion ModuloWiFi a la Red");
  WiFi.begin(ssid,password);
  Serial.println("[ModuloWiFi]  Conectando :");
  Serial.println();

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }

  Serial.print("\n\n");
  Serial.print("[ModuloWiFi]  Conexion Establecida con la red: ");
  Serial.print(ssid);
  Serial.println();
  Serial.print("[ModuloWiFi]  Direccion IP: ");
  Serial.print(WiFi.localIP());
  Serial.println("\n");
  Serial.println("[ModuloWiFi]  Conexion atraves de Sockets");

  client.connect(host, port);


  if(!client.connect(host, port)) {
    Serial.println("[ModuloWiFi]  Conexion Sockets Fallo ");
    Serial.println();
    return;
  }
  if(client.connected())
  {

    //client.send("connection", "message", "Connected !!!!");
    Serial.println("[ModuloWiFi]  Conexion Sockets Establecida ");
    Serial.println();
  }


  objeto["key 2"] = "Valor 2";
  objeto["value 2"] = 32;
  serializeJsonPretty(objeto, JSON);
}


void loop()
{
    if((client.connected()))
    {
      Serial.println("entrar");
      client.sendJSON("ModuloWiFi2",JSON);
      Serial.println(JSON);
      delay(3000);
    }
    else
    {
      client.reconnect(host,port);
    }

}
