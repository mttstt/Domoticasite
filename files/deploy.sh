kk#!/bin/bash
echo date | tee /home/pi/deploy.log
/home/pi/.nvm/versions/node/v6.7.0/bin/forever stop 0
rm -rf /home/pi/DomoticasiteP
mv /home/pi/Domoticasitetmp /home/pi/DomoticasiteP
cd /home/pi/DomoticasiteP/programs/server
npm install --save wiring-pi
npm install --save git+https://github.com/HardwareProjects/node-dht-sensor.git
npm install
npm install --save wiring-pi
/home/pi/.nvm/versions/node/v6.7.0/bin/forever start /home/pi/DomoticasiteP/main.js

