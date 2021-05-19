@echo off
gcc -O2 -o $$$ test.c
$$$
echo.
pause
del $$$.exe
