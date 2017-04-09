set /P pswd=<PASSWORD.txt

@echo off

"C:\Program Files (x86)\WinSCP\WinSCP.com" ^
  /log="C:\Users\matteo\Documents\GitHub\Domoticasite\WinSCP.log" /ini=nul ^
  /command ^
    "open sftp://pi:""%pswd%""@192.168.1.130:22/ -hostkey=""ssh-rsa 2048 38:b5:a9:b0:f9:94:c3:3d:98:65:df:d3:77:56:7d:01""" ^
    "ls" ^
    "put C:\Users\matteo\Documents\GitHub\Domoticasite\DomoticasiteP\* /home/pi/Domoticasitetmp" ^
    "call /home/pi/files/deploy.sh" ^ 	
    "exit"

set WINSCP_RESULT=%ERRORLEVEL%
if %WINSCP_RESULT% equ 0 (
  echo Success
) else (
  echo Error
)

exit /b %WINSCP_RESULT%