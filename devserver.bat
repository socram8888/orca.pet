@echo off
cd "%~dp0"
bash -c "source ~/.profile; ./devserver.sh"
pause
