#!/bin/bash
PATH=/home/pi/.nvm/versions/node/v4.8.6/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games
echo $(date) | tee /tmp/deploy.log
# forever stopall
echo " Stoping /etc/init.d/Domoticasite..."
sudo /etc/init.d/Domoticasite stop
echo " Stopped /etc/init.d/Domoticasite..."
rm -rf ~/Domoticasite
echo " Moving bundle to /home/pi/Domoticasite..."
cp -r /tmp/bundle ~/Domoticasite
echo " Finishied moving bundle to /home/pi/Domoticasite..."
#rm ~/.forever/*.log
cd ~/Domoticasite/programs/server
meteor npm install --save node-gyp@3.6.0
meteor npm install --save node-pre-gyp@0.6.34
meteor npm install
meteor npm install --save wiringpi-node
meteor npm install --save git+https://github.com/HardwareProjects/node-dht-sensor.git
cd ~/Domoticasite
sudo /etc/init.d/Domoticasite start

