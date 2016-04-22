taskkill /f /im app.exe

%~d0 && cd %~dp0

cd ../
del app.zip
del app.exe
cd app

start cmd /c "%CuttentPath%grunt build"
ping -n 3 127.1>nul
cd ../build
copy /b nw.exe+app.zip app.exe
ping -n 3 127.1>nul
echo "starting... please waitting!"
start app.exe
