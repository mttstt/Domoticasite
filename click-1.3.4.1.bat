del /Q Domoticasite.json
rmdir Domoticasite /S /Q

rename Domo*.json Domoticasite.json   
meteor-kitchen ./Domoticasite.json ./Domoticasite --meteor-release 1.3.4.1
cd ./Domoticasite

meteor --settings ../production-settings.json  --release 1.3.4.1                