#!/bin/bash
echo $(date) | tee /tmp/deploy.log
forever stop 0
rm -rf ~/Domoticasite
mv /tmp/bundle ~/Domoticasite
rm ~/.forever/*.log
cd ~/Domoticasite/programs/server
/sbin/meteor npm install
/sbin/meteor npm install --save wiringpi-node
/sbin/meteor npm install --save git+https://github.com/HardwareProjects/node-dht-sensor.git
cd ~/Domoticasite
forever start 0
