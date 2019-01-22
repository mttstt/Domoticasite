// References:
// https://www.hackster.io/ROBINTHOMAS/esp8266-esp-01-webserver-7248ca
// https://github.com/H4ndl3/pvimon/blob/master/pvimon.ino
// http://www.gianlucaghettini.net/lettura-fotovoltaico-da-remoto-con-nodemcu/
// https://github.com/jrbenito/ABBAurora

#include <ESP8266WiFi.h>
// #include <SoftwareSerial.h>
 
const char* ssid = "MTT_2.4";//type your ssid
const char* password = "x";//type your password
 
// =================================================================
SoftwareSerial RS485(rxPin, txPin);
#define pviAddr 2  // address of the inverter (2 is the default)
#define timeout 1000  // timeout while receiving data in ms
boolean recOk; // stores info of receiving success or fail
float GridPower;  // current power feeding to grid

/* CRC calculation
//                                      16   12   5
// This is the CCITT CRC 16 polynomial X  + X  + X  + 1.
// This works out to be 0x1021, but the way the algorithm works
// lets us use 0x8408 (the reverse of the bit pattern). The high
// bit is always assumed to be set, thus we only use 16 bits to
// represent the 17 bit value.
*/

#define POLY 0x8408

unsigned int crc16(byte *data_p, byte length)
{
  byte i;
  unsigned int data;
  unsigned int crc = 0xffff;

  if (length == 0)
    return (~crc);
  do
  {
    for (i=0, data=(unsigned int)0xff & *data_p++;
      i < 8; 
      i++, data >>= 1)
    {
      if ((crc & 0x0001) ^ (data & 0x0001))
        crc = (crc >> 1) ^ POLY;
      else  crc >>= 1;
    }
  } while (--length);
  crc = ~crc;
  return (crc);
}

byte receiveAnswer() {
  byte recBuff[8];  // receiving buffer, 8 bytes
  unsigned int  recCRC;
  byte i;
  unsigned long startMillis, currentMillis;
  startMillis = millis();
  currentMillis = startMillis;
  i = 0;
  while (RS485.available() > 0 and (i <= sizeof(recBuff)) and (currentMillis - startMillis < timeout)) { 
    recBuff[i] = RS485.read();
    currentMillis = millis();
    i++;
  }
  if ((currentMillis - startMillis < timeout) and (recBuff[0] == 0)) {  // no timeout and transmission state is ok
    recCRC = recBuff[6] + (recBuff[7] << 8);
    if (recCRC == crc16(recBuff, 6))  // CRC value is ok
      recOk = true;
    else
      Serial.println("CRC Error");
  }
  else if (recBuff[0] != 0)
    Serial.println("Error Code ");
  else
    Serial.println("Timeout while receiving data");

 /* Serial.println("Values for Debugging: ");
  for (i = 0; i < 8; i++) {
    Serial.print(i);
    Serial.print(". Value: ");
    Serial.print(recBuff[i]);
    Serial.print(" ");
  } */
  
  return(recBuff);
}

bool sendQuery(byte addr, byte cmd1, byte cmd2, byte cmd3) {
  byte cmdBuff[] = { addr, cmd1, cmd2, cmd3, 0, 0, 0, 0, 0, 0 }; // command buffer, 10 bytes
  unsigned int checksum;
  checksum = crc16(cmdBuff, 8);
  cmdBuff[8] = lowByte(checksum);
  cmdBuff[9] = highByte(checksum);
  digitalWrite(rtsPin, HIGH); // activate transmission mode
  if (RS485.write(cmdBuff, 10) == 10) {
    digitalWrite(rtsPin, LOW);  // switch back to receiving mode
    return(true);
  }
  else {
    Serial.println("Error while sending data");
    digitalWrite(rtsPin, LOW);  // switch back to receiving mode
    return(false);
  }
}

float toFloat(byte byteValues[]) {
  byte switchOrder[4];
  float *floatValue; 
  switchOrder[0] = byteValues[5];
  switchOrder[1] = byteValues[4];
  switchOrder[2] = byteValues[3];
  switchOrder[3] = byteValues[2];
  floatValue = (float *)switchOrder;
  return(*floatValue);
}


//ReadDSP
bool getGridPower(float *GridPower) {
  byte tmpBuff[8];
  byte i;
  recOk = false;
    if (sendQuery(pviAddr, 59, 3, 0))
    tmpBuff[8] = receiveAnswer();
    *GridPower = toFloat(tmpBuff);
  if (recOk == true) 
    return true;
  else
    return false;
}

//===============================================


WiFiServer server(80);
 
void setup() {
 
  RS485.begin(19200);  // initialize serial connection to the inverter
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
 
  // Interrogation to RS485
  if (getGridPower(&GridPower)) {
    Serial.println("Current power being produced is: ");
    Serial.print(GridPower);
    Serial.print(" Watts");
    Serial.println();
    Serial.println();
  }
  else
    Serial.println("Error, please look above for details.");
    delay(1000);
 }
