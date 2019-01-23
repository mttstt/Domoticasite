// References:
// https://www.hackster.io/ROBINTHOMAS/esp8266-esp-01-webserver-7248ca
// https://github.com/H4ndl3/pvimon/blob/master/pvimon.ino
// http://www.gianlucaghettini.net/lettura-fotovoltaico-da-remoto-con-nodemcu/
// https://github.com/jrbenito/ABBAurora

#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
 
const char* ssid = "MTT_2.4";//type your ssid
const char* password = "xx";//type your password
 



WiFiServer server(80);
 
void setup() {
  RS485.begin(19200);     // initialize serial connection to the inverter
  pinMode(rxPin, INPUT);  // set pin modes
  pinMode(txPin, OUTPUT);
  pinMode(rtsPin, OUTPUT);
  Serial.begin(115200);
  delay(10);
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
   
  // Start the server
  server.begin();
  Serial.println("Server started");
 
  // Print the IP address
  Serial.print("Use this URL to connect: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/"); 
}

void loop() {
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
   
  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
   
  // Read the first line of the request
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();
   
   // Return the response
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println(""); //  do not forget this one
  client.println("<!DOCTYPE HTML>");
  client.println("<html>");   
  client.print("I'm here !");  
  client.println("</html>"); 
  delay(1);
  Serial.println("Client disonnected");
  Serial.println("");
 
  
 }
