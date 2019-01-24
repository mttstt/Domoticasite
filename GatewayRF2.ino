// References:
// https://1technophile.blogspot.com/2016/08/low-cost-low-power-6ua-garden-433mhz.html
// https://github.com/esp8266/Arduino/blob/master/doc/reference.rst
// https://arduino.stackexchange.com/questions/44531/arduino-esp8266-direct-fast-control-of-the-digital-pins
// https://www.instructables.com/id/Using-an-ESP8266-to-Control-Mains-Sockets-Using-43/
// http://nerdralph.blogspot.com/2015/04/a-4mbps-shiftout-for-esp8266arduino.html

// Note(1): Watt OK. max pinout watt of Nodemcu 1.0 10mW, Cheap transmitter 433mhz 10 10mW
// Note(2): digitalwrite() Esp8286 function runs to 160Khz (6,25 μs): it is enough for this program

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h> 
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
 
char ssid[] = "MTT_2.4";//type your ssid
char password[] = "xxx";//type your password
#define SERVER_PORT 80
const int pulse = 360; //μs
//const char* up6 = '110011000000100100000000000000001011100100000001101000100000000000'
#define UP6_SIZE 67
int up6[67] = {1,1,0,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0};
#define pin 3  //GPIO3 = RX pin
#define NUM_ATTEMPTS 3

char header[10];

//Do we want to see trace for debugging purposes
#define TRACE 1  // 0= trace off 1 = trace on

void trc(String msg);              // function prototypes 
void transmit_code(int code[]);
void handleRoot();


WiFiServer server (SERVER_PORT);
 
void setup(void) {
  Serial.begin(115200);
  delay(10);
  // Connect to WiFi network
  Serial.print("Attempting to connect to WPA network...");
  Serial.println(ssid);
 
  Serial.flush();
  SerialUSB.println("I'm here!")
   
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");   
  // Start the server
  server.begin();
  Serial.print("Web Server started. Use this URL to connect: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/"); 
  // =======================================================
  if (!MDNS.begin("gatewayRF")) {
       Serial.println("Error setting up MDNS responder!");
       while(1) { 
         delay(1000);
       }
     }
     Serial.println("mDNS responder started");
  MDNS.addService("http", "tcp", SERVER_PORT);
  // =======================================================

  server.on("/UP6", HTTP_GET, handleRoot);
  server.onNotFound([](){server.send(404, "text/plain", "404: Not found"); });

  pinMode(pin,OUTPUT);  // sets the digital pin 3 as output
  trc("Sets the digital pin 3 as output"); 
  yield();
}

void loop(voip) {
  server.handleClient();     
}


// trace function
void trc(String msg){if (TRACE) { Serial.println(msg); } }


void transmit_code(int code[]){
  for (int i = 0; i < NUM_ATTEMPTS; i++) {        
      // ----------------------- Preamble ----------------------
      trc("transmit preamble");
      digitalWrite(pin, LOW); 
      delay(3000);  // sleep for 0,3 seconds
      for (int i = 0; i < 12; i++) { 
        digitalWrite(pin, HIGH); 
        delayMicroseconds(pulse);
        digitalWrite(pin, LOW); 
        delayMicroseconds(pulse);  
      }
     // ---------------------- End Preamble --------------------
     // -----------------------Segnal --------------------------
      trc("transmit segnal");
      digitalWrite(pin, LOW);
      delayMicroseconds(3500); // added 3,5 millis
      int c=0;
      for (c=0;c<UP6_SIZE;c++) {     
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
    delay(2000); // added 2 millis 
 }
}


void handleRoot() {server.send(200, "text/html", "<h1> Gateway Rf </h1> <p>up6</p> ");
                   transmit_code(up6);                   
                   }
