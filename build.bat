@echo off
echo BUILD
SET dirApp=%~dp0
del /Q "%dirApp%"\Domoticasite.json
curl https://www.meteorkitchen.com/api/getapp/json/N526wRpB3xekvDM5M -o %dirApp%\Domoticasite.json
rmdir bundle /S /Q
mkdir emptyfolder
robocopy emptyfolder bundle /purge
rmdir emptyfolder
rmdir bundle 
rmdir Domoticasite /S /Q
mkdir Domoticasite
meteor-kitchen %dirApp%\Domoticasite.json %dirApp%\Domoticasite --meteor-release 1.5.4
cd ./Domoticasite
meteor build --architecture=os.linux.x86_64 --directory %dirApp%  & cd %dirApp%