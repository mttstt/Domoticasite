del /Q Domoticasite.json
rmdir Domoticasite /S /Q

rename Domo*.json Domoticasite.json   
meteor-kitchen ./Domoticasite.json ./Domoticasite --meteor-release 1.3.4.1  2>io.txt
cd ./Domoticasite
               