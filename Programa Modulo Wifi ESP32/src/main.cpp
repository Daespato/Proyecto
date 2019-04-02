
#include <Arduino.h>
#include "SocketIOClient.h"
#include <ArduinoJson.h>

#define LedPin 2
#define ButtonPin 0

//#define ESP8266
#define ESP32

//const char* ssid = "TOBAR";
//const char* password = "tobar3623";

const char* ssid = "gerencia";
const char* password = "gerencia7336200$";

char host[] = "192.168.2.218";
//char host[] = "192.168.1.7";
int port = 1234;

String JSON;
StaticJsonDocument<10000> doc;
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
  serializeJsonPretty(objeto, JSON);
}


void loop()
{
    if((client.connected()))
    {
      Serial.println("entrar");
      client.sendJSON("ModuloWiFi",JSON);
      Serial.println(JSON);
      delay(3000);
    }
    else
    {
      client.connect(host, port);
    }

}
