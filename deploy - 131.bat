set /P pswd=<PASSWORD131.txt

@echo off

"C:\Program Files (x86)\WinSCP\WinSCP.com" ^
  /log="C:\Users\matteo\Documents\GitHub\Domoticasite\WinSCP.log" /ini=nul ^
  /command ^
    "open sftp://pi:""%pswd%""@192.168.1.131:22/ -hostkey=""ssh-ed25519 256 54:4d:f9:10:e4:be:ad:b1:f9:90:a3:a8:b2:69:50:44""" ^
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