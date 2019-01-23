
/*
  Autora Communication Protocol

  This example code is in the public domain.

  created June 2nd, 2013
  by Fabio Morgana
  morganaf@me.com
*/

#include <Ethernet.h>
#include <SPI.h>

#define  _STATE     1
#define  _VERSION   2
#define  _POWER     3
#define  _VOLTAGE1  4
#define  _VOLTAGE2  5
#define  _CURRENT1  6
#define  _CURRENT2  7
#define  _POWERDAY  8
#define  _POWERTOT  9
#define  _POWERPEAK 10
#define  _POWERPEAKDAY  11

#define _SERIALLOG  0

#define _DELAYBETWEENCOMMAND 100
#define _DELAYBETWEENLOG     10000

// digital pin 2 has a pushbutton attached to it. Give it a name:
byte enableRS485Pin = 2;

char inBytes[8];
byte commandState[10]         = {2, 50,  0, 0, 0, 0, 0, 0, 0, 0};
byte commandVersion[10]       = {2, 58,  0, 0, 0, 0, 0, 0, 0, 0};
byte commandGridPower[10]     = {2, 59,  3, 0, 0, 0, 0, 0, 0, 0};
byte commandInput1Voltage[10] = {2, 59, 23, 0, 0, 0, 0, 0, 0, 0};
byte commandInput2Voltage[10] = {2, 59, 26, 0, 0, 0, 0, 0, 0, 0};
byte commandInput1Current[10] = {2, 59, 25, 0, 0, 0, 0, 0, 0, 0};
byte commandInput2Current[10] = {2, 59, 27, 0, 0, 0, 0, 0, 0, 0};
byte commandPowerDay[10]      = {2, 78,  0, 0, 0, 0, 0, 0, 0, 0};
byte commandPowerTotal[10]    = {2, 78,  5, 0, 0, 0, 0, 0, 0, 0};
byte commandPowerPeak[10]     = {2, 59, 34, 0, 0, 0, 0, 0, 0, 0};
byte commandPowerPeakDay[10]  = {2, 59, 35, 0, 0, 0, 0, 0, 0, 0};

float power, voltage1, current1, voltage2, current2, powerpeak, powerpeakday;
unsigned long powerday, powertot;

byte mac[] = { metter il mac address del vostro Arduino Ethernet };
IPAddress ip(192,168,1,254);
boolean incoming = 0;
EthernetServer server(80);
byte requestValue = 0;

// the setup routine runs once when you press reset:
void setup() {
 // initialize serial communication at 9600 bits per second:
 Serial.begin(19200);

 //initialize enableRS485Pin
 pinMode(enableRS485Pin, OUTPUT);
 digitalWrite(enableRS485Pin, HIGH);

 //initialize Ethernet Connection
 Ethernet.begin(mac, ip);
 server.begin();
 Serial.print("server is at ");
 Serial.println(Ethernet.localIP());
}

int numC;
void loop() {
 // listen for incoming clients
 EthernetClient client = server.available();
 if (client) {
   numC = 0;
   requestValue = 0;
   Serial.println("New client");
   // an http request ends with a blank line
   boolean currentLineIsBlank = true;
   while (client.connected()) {
     if (client.available()) {
       char c = client.read();
       Serial.write(c);
       // if you've gotten to the end of the line (received a newline
       // character) and the line is blank, the http request has ended,
       // so you can send a reply
       //reads URL string from $ to first blank space
       if(incoming && c == ' '){ 
         incoming = 0;
       }
       if(c == '$'){ 
         incoming = 1;
       }
       
       //Checks for the URL string parameter
       if(incoming == 1){
         if (numC)
            requestValue = requestValue*10 + (c - 48);
         numC++;
       }

       if (c == '\n' && currentLineIsBlank) {
         Serial.print("Start command: ");
         Serial.println(requestValue);
         delay(_DELAYBETWEENCOMMAND); 
         // send a standard http response header
         client.println("HTTP/1.1 200 OK");
         client.println("Content-Type: text/xml");
         client.println("Connection: close");  // the connection will be closed after completion of the response
         client.println();
         client.println("<?xml version = \"1.0\" ?>");
         client.print("<values>");
         switch (requestValue) {
           default:
             sendCommand(_POWER);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_VOLTAGE1);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_CURRENT1);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_VOLTAGE2);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_CURRENT2);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_POWERDAY);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_POWERTOT);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_POWERPEAK);
             delay(_DELAYBETWEENCOMMAND); 
             sendCommand(_POWERPEAKDAY);
             delay(_DELAYBETWEENCOMMAND); 

             client.print("<power>");
             client.print(power);
             client.print("</power>");

             client.print("<voltage1>");
             client.print(voltage1);
             client.print("</voltage1>");

             client.print("<current1>");
             client.print(current1);
             client.print("</current1>");

             client.print("<voltage2>");
             client.print(voltage2);
             client.print("</voltage2>");

             client.print("<current2>");
             client.print(current2);
             client.print("</current2>");

             client.print("<powerday>");
             client.print(powerday);
             client.print("</powerday>");

             client.print("<powertot>");
             client.print(powertot);
             client.print("</powertot>");

             client.print("<powerpeak>");
             client.print(powerpeak);
             client.print("</powerpeak>");

             client.print("<powerpeakday>");
             client.print(powerpeakday);
             client.print("</powerpeakday>");
             break;
         }
         client.println("</values>");
         break;
       }
       if (c == '\n') {
         // you're starting a new line
         currentLineIsBlank = true;
       } 
       else if (c != '\r') {
         // you've gotten a character on the current line
         currentLineIsBlank = false;
       }
     }
   }
   // give the web browser time to receive the data
   delay(1);
   // close the connection:
   client.stop();
   Serial.println("client disconnected");
 }
}
