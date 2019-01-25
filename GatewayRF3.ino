#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h> 
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>   // Include the WebServer library

#define SERVER_PORT 80
const int pulse = 360; //μs
#define UP6_SIZE 67
byte up6[] = {1,1,0,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0};
#define pin 4  //GPIO4 = 2
#define NUM_ATTEMPTS 3
#define TRACE 1  // 0= trace off 1 = trace on Do we want to see trace for debugging purposes
void trc(String msg);              // function prototypes 
void transmit_code(char code[]);

ESP8266WiFiMulti wifiMulti;     // Create an instance of the ESP8266WiFiMulti class, called 'wifiMulti'

ESP8266WebServer server(80);    // Create a webserver object that listens for HTTP request on port 80

void setup(void){
  pinMode(pin,OUTPUT);
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
  Serial.println('\n');

  wifiMulti.addAP("MTT_2.4", "xxxxx");   // add Wi-Fi networks you want to connect to

  Serial.println("Connecting ...");
  int i = 0;
  while (wifiMulti.run() != WL_CONNECTED) { // Wait for the Wi-Fi to connect: scan for Wi-Fi networks, and connect to the strongest of the networks above
    delay(250);
    Serial.print('.');
  }
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());              // Tell us what network we're connected to
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());           // Send the IP address of the ESP8266 to the computer

  if (MDNS.begin("esp8266")) {              // Start the mDNS responder for esp8266.local
    Serial.println("mDNS responder started");
  } else {
    Serial.println("Error setting up MDNS responder!");
  }
  server.on("/", HTTP_GET, []() { transmit_code(up6); 
                                  server.send(200, "text/html", "<h1> Gateway Rf </h1> <p>"+server.uri()+"</p> ");  
                                });
  server.onNotFound([]() { server.send(404, "text/plain", "404: Not Found"); });
  server.begin();                           // Actually start the server
  Serial.println("HTTP server started");
}

void loop(void){
  server.handleClient();                    // Listen for HTTP requests from clients
}

// trace function
void trc(String msg){if (TRACE) { Serial.println(msg); } }

void transmit_code(byte code[]){
  for (int i = 0; i < NUM_ATTEMPTS; i++) {        
      // ----------------------- Preamble ----------------------
      digitalWrite(pin, LOW); 
      delay(50);  // sleep for 0,3 seconds
      for (int i = 0; i < 12; i++) {
        digitalWrite(pin, HIGH); 
        delayMicroseconds(pulse);
        digitalWrite(pin, LOW); 
        delayMicroseconds(pulse);  
      }
      // ---------------------- End Preamble --------------------
      // -----------------------Segnal --------------------------
      //trc("transmit segnal");
      digitalWrite(pin, LOW);
      delayMicroseconds(3500); // added 3,5 millis
      int c=0;
      for (c=0;c<UP6_SIZE;c++) {
         //Serial.print(code[c]);     
         if (code[c] == '1'){
             digitalWrite(pin, HIGH); 
             delayMicroseconds(pulse);
             digitalWrite(pin, LOW); 
             delayMicroseconds(pulse*2);
         } 
         else if (code[c] == '0'){
             digitalWrite(pin, HIGH); 
             delayMicroseconds(pulse*2);
             digitalWrite(pin, LOW); 
             delayMicroseconds(pulse);
         } 
         else
         {     
            digitalWrite(pin, LOW);
            delayMicroseconds(3000); // added 3 millis
         }
    // ---------------------End Segnal --------------------------   
    }
    yield();
    delayMicroseconds(2000); // added 2 millis 
 }
 trc("Segnal sended ");
}
