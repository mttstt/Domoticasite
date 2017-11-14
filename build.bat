@echo off
echo BUILD
SET dir1=%~dp0
del /Q "%dir1%"\Domoticasite.json
curl https://www.meteorkitchen.com/api/getapp/json/N526wRpB3xekvDM5M -o %dir1%\Domoticasite.json
rmdir bundle /S /Q
mkdir emptyfolder
robocopy emptyfolder bundle /purge
rmdir emptyfolder
rmdir bundle 
rmdir Domoticasite /S /Q
mkdir Domoticasite
meteor-kitchen %dir1%\Domoticasite.json %dir1%\Domoticasite --meteor-release 1.5.2.2
cd ./Domoticasite
meteor add vansonhk:bootstrap3-datepicker & ^
meteor remove rajit:bootstrap3-datepicker & ^
meteor build --architecture=os.linux.x86_64 --directory %dir1% & cd %dir1%
