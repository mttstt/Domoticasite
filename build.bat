@echo off

echo BUILD
 
SET dir1=C:\Users\matteo\Documents\GitHub\Domoticasite

del /Q "%dir1%"\Domoticasite.json

curl https://www.meteorkitchen.com/api/getapp/json/N526wRpB3xekvDM5M -o %dir1%\Domoticasite.json

rmdir DomoticasiteP /S /Q
mkdir emptyfolder
robocopy emptyfolder DomoticasiteP /purge
rmdir emptyfolder
rmdir DomoticasiteP 
rmdir Domoticasite /S /Q
  
meteor-kitchen ./Domoticasite.json ./Domoticasite --meteor-release 1.3.4.1

cd ./Domoticasite


meteor build --architecture=os.linux.x86_64 --directory %dir1%\DomoticasiteP & cd %dir1%
