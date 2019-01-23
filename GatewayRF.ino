// References:
// https://1technophile.blogspot.com/2016/08/low-cost-low-power-6ua-garden-433mhz.html
// https://github.com/esp8266/Arduino/blob/master/doc/reference.rst
// https://arduino.stackexchange.com/questions/44531/arduino-esp8266-direct-fast-control-of-the-digital-pins
// https://www.instructables.com/id/Using-an-ESP8266-to-Control-Mains-Sockets-Using-43/
// http://nerdralph.blogspot.com/2015/04/a-4mbps-shiftout-for-esp8266arduino.html

// Note(1): Watt OK. max pinout watt of Nodemcu 1.0 10mW, Cheap transmitter 433mhz 10 10mW
// Note(2): digitalwrite() Esp8286 function runs to 160Khz (6,25 μs): it is enough for this program

#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
 
char ssid[] = "MTT_2.4";//type your ssid
char password[] = "xxx";//type your password
#define SERVER_PORT 80
const int pulse = 360; //μs
//const char* up6 = '110011000000100100000000000000001011100100000001101000100000000000'
#define ARRAYUP6_SIZE 67 
int Arrayup6[67] = {1,1,0,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0};
#define pin 3  //GPIO3 = RX pin
#define NUM_ATTEMPTS 3

//Do we want to see trace for debugging purposes
#define TRACE 1  // 0= trace off 1 = trace on

//trace function
void trc(String msg){if (TRACE) { Serial.println(msg); } }

WiFiServer server(SERVER_PORT);
 
void setup() {
  delay(10);
  // Connect to WiFi network
  //Serial.begin(9600);
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
  Serial.println("/"); 
 
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
 
  pinMode(pin,OUTPUT);  // sets the digital pin 3 as output
  trc("Sets the digital pin 3 as output");
}

String prepareHtmlPage()
{
 String htmlPage =
     String("HTTP/1.1 200 OK\r\n") +
            "Content-Type: text/html\r\n" +
            "Connection: close\r\n" +  // the connection will be closed after completion of the response
            "Refresh: 5\r\n" +  // refresh the page automatically every 5 sec
            "\r\n" +
            "<!DOCTYPE HTML>" +
            "<html>" +
            "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
            "<link rel=\"icon\" href=\"data:,\">" +
            "<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}" +
            ".button { background-color: #195B6A; border: none; color: white; padding: 16px 40px;" +
            "text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}" +
            ".button2 {background-color: #77878A;}</style></head>" +
            "<body><h1>Esp8266 Gateway RF</h1>" +
            "<p>Command - " + "line" + "</p>" +
            "<p><a href=\"/up6\"><button class=\"button\">MOVE</button></a></p>" +  // to adjust          
            "</body></html>" +
            "\r\n";
  return htmlPage;
}

void transmit_code(int code[]){
  for (int i = 0; i < NUM_ATTEMPTS; i++) {        
      // ----------------------- Preamble ----------------------
      trc("transmit preamble");
      digitalWrite(pin, LOW); 
      delay(3000);  // sleep for 0,3 seconds
      for (int i = 0; i < 11; i++) { 
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
      for (c=0;c<ARRAYUP6_SIZE;c++) {     
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
    delay(2000); // added 2 millis 
 }
}


void loop() {
{
  WiFiClient client = server.available();
  // wait for a client (web browser) to connect
  if (client)
  {
    Serial.println("\n[Client connected]");
    // loop while the client's connected
    while (client.connected())
    {
      // read line by line what the client (web browser) is requesting
      if (client.available())
      {
        String line = client.readStringUntil('\r');
        Serial.print(line);       
        //============================================================
        if (line.indexOf("GET /up6") >= 0) {
            Serial.println("/up6");              
            transmit_code(Arrayup6);  //transmit_code_old(up6);
           } else if (line.indexOf("GET /do6") >= 0) {
             Serial.println("/up6");
             transmit_code(Arrayup6); //transmit_code_old(up6);
        }
        //=============================================================              
        // wait for end of client's request, that is marked with an empty line             
        if (line.length() == 1 && line[0] == '\n')
        {                      
          client.println(prepareHtmlPage());
          break;
        }
      }
    }
    delay(1); // give the web browser time to receive the data
    // close the connection:
    client.stop();
    Serial.println("[Client disonnected]");
  }
 }
}
