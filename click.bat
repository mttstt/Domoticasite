del /Q Domotocasite.json
rmdir Domotocasite /S /Q

rename *.json Domotocasite.json  
meteor-kitchen ./Domotocasite.json ./Domotocasite
cd ./Domotocasite

meteor