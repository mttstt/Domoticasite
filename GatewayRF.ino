// References:
// https://1technophile.blogspot.com/2016/08/low-cost-low-power-6ua-garden-433mhz.html
// https://github.com/esp8266/Arduino/blob/master/doc/reference.rst
// https://arduino.stackexchange.com/questions/44531/arduino-esp8266-direct-fast-control-of-the-digital-pins
// Note: digitalwrite()Esp8286 function runs to 160Khz (6,25 μs): it is enough for this program

#include <ESP8266WiFi.h>
 
const char* ssid = "MTT_2.4";//type your ssid
const char* password = "xx";//type your password
const int pin = ???;
const int pulse = 360; //μs

const char* up6 = '110011000000100100000000000000001011100100000001101000100000000000'

//Do we want to see trace for debugging purposes
#define TRACE 0  // 0= trace off 1 = trace on

WiFiServer server(80);
 
void setup() {
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
 
  // Configure pin
  pinMode(pin,OUTPUT);
  trc("Open pin");
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
 // ==================================
  def transmit_code(code):
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
             
      # -------End Segnal ------------------------------------------
      pi.wave_clear()
      pi.wave_add_generic(f1)
      f = pi.wave_create() # create and save id
      for t in range(NUM_ATTEMPTS):
         print("sending {}".format(t))
         pi.wave_send_repeat(f)
         time.sleep(0.2)
 
 }


void sleepSeconds(int seconds)
{
  for (int i = 0; i < seconds; i++) { 
     LowPower.powerDown(SLEEP_1S, ADC_OFF, BOD_OFF); 
  }
}



//trace function
void trc(String msg){
  if (TRACE) {
  Serial.println(msg);
  }
}
