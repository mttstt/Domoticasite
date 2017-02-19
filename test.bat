SET dir1=C:\Users\matteo\Documents\GitHub\Domoticasite

cd C:\Users\matteo\Downloads
for /F "delims=" %%I in ('dir /b /a-d /od') do set LATEST=%%I
echo "%LATEST%"
copy "%LATEST%" "%dir1%"

cd "%dir1%"

rmdir DomoticasiteP /S /Q
mkdir emptyfolder
robocopy emptyfolder DomoticasiteP /purge
rmdir emptyfolder
rmdir DomoticasiteP 
rmdir Domoticasite /S /Q

del /Q Domoticasite.json
rename Domo*.json Domoticasite.json   

meteor-kitchen ./Domoticasite.json ./Domoticasite --meteor-release 1.3.4.1

cd ./Domoticasite
meteor --settings ../production-settings.json