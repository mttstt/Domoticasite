// References:
// https://1technophile.blogspot.com/2016/08/low-cost-low-power-6ua-garden-433mhz.html
// https://github.com/esp8266/Arduino/blob/master/doc/reference.rst
// https://arduino.stackexchange.com/questions/44531/arduino-esp8266-direct-fast-control-of-the-digital-pins
// https://www.instructables.com/id/Using-an-ESP8266-to-Control-Mains-Sockets-Using-43/
// http://nerdralph.blogspot.com/2015/04/a-4mbps-shiftout-for-esp8266arduino.html

// Note(1): Watt OK. max pinout watt of Nodemcu 1.0 10mW, Cheap transmitter 433mhz 10 10mW
// Note(2): digitalwrite()Esp8286 function runs to 160Khz (6,25 μs): it is enough for this program

#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
 
char ssid[] = "MTT_2.4";//type your ssid
char password[] = "xxx";//type your password
#define SERVER_PORT 80
const int pulse = 360; //μs
//const char* up6 = '110011000000100100000000000000001011100100000001101000100000000000'
#define ARRAYUP6_SIZE 67 
int Arrayup6[] = {1,1,0,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0};
#define pin 3  //GPIO3 = RX pin
#define NUM_ATTEMPTS 3

//Do we want to see trace for debugging purposes
#define TRACE 1  // 0= trace off 1 = trace on

WiFiServer server(SERVER_PORT);
 
void setup() {
  delay(10);
  // Connect to WiFi network
  Serial.begin(9600);
  delay(10);
  Serial.print("Attempting to connect to WPA network...");
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
  // =======================================================
     // Set up mDNS responder:
     // - first argument is the domain name, in this example
     //   the fully-qualified domain name is "esp8266.local"
     // - second argument is the IP address to advertise
     //   we send our IP address on the WiFi network
     if (!MDNS.begin("esp8266GatewayRF")) {
       Serial.println("Error setting up MDNS responder!");
       while(1) { 
         delay(1000);
       }
     }
     Serial.println("mDNS responder started");
     MDNS.addService("http", "tcp", SERVER_PORT);
  // =======================================================
 
  Serial.println("/"); 

  pinMode(pin,OUTPUT);  // sets the digital pin 3 as output
  trc("Sets the digital pin 3 as output");
}

void loop() {
  // listen for incoming clients
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
  client.stop();
  Serial.println("Client disonnected");
  Serial.println(); 
  trc("Transmit");
  //transmit_code_old(up6);
  transmit_code(Arrayup6);
  trc("End Transmit"); 
 }

//trace function
void trc(String msg){if (TRACE) { Serial.println(msg); } }


void transmit_code_old(String code){
  for (int i = 0; i < NUM_ATTEMPTS; i++) {        
      # ----------------------- Preamble ----------------------
      trc("Begin Preamble");
      digitalWrite(pin, LOW); 
      delay(3000);  // sleep for 0,3 seconds
      for (int i = 0; i < 11; i++) { 
        digitalWrite(pin, HIGH); 
        delayMicroseconds(pulse);
        digitalWrite(pin, LOW); 
        delayMicroseconds(pulse);  
      }
      # ---------------------- End Preamble --------------------
      # -----------------------Segnal --------------------------
      digitalWrite(pin, LOW);
      delayMicroseconds(3500); # added 3,5 millis       
      for c in code:
         if c == '1':
             digitalWrite(pin, HIGH); 
             delayMicroseconds(pulse);
             digitalWrite(pin, LOW); 
             delayMicroseconds(pulse*2);  
         elif c == '0':
             digitalWrite(pin, HIGH); 
             delayMicroseconds(pulse*2);
             digitalWrite(pin, LOW); 
             delayMicroseconds(pulse);  
         else:
            continue     
      digitalWrite(pin, LOW);
      delayMicroseconds(3000); # added 3 millis       
      # ---------------------End Segnal --------------------------        
      delay(2000); # added 2 millis 
}
 
 
 void transmit_code(Array code){
  for (int i = 0; i < NUM_ATTEMPTS; i++) {        
      # ----------------------- Preamble ----------------------
      trc("transmit preamble");
      digitalWrite(pin, LOW); 
      delay(3000);  // sleep for 0,3 seconds
      for (int i = 0; i < 11; i++) { 
        digitalWrite(pin, HIGH); 
        delayMicroseconds(pulse);
        digitalWrite(pin, LOW); 
        delayMicroseconds(pulse);  
      }
      # ---------------------- End Preamble --------------------
      # -----------------------Segnal --------------------------
      trc("transmit segnal");
      digitalWrite(pin, LOW);
      delayMicroseconds(3500); # added 3,5 millis
      for (c=0;c<ARRAYUP6_SIZE;c++) {     
         if (code[c] == 1){   
             digitalWrite(pin, HIGH); 
             delayMicroseconds(pulse);
             digitalWrite(pin, LOW); 
             delayMicroseconds(pulse*2);
         } 
         else if (code[c] == 0){
             digitalWrite(pin, HIGH); 
             delayMicroseconds(pulse*2);
             digitalWrite(pin, LOW); 
             delayMicroseconds(pulse);
         } 
         else:
         {     
            digitalWrite(pin, LOW);
            delayMicroseconds(3000); # added 3 millis
         }
    # ---------------------End Segnal --------------------------   
    } 
    delay(2000); # added 2 millis 
}

