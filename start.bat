@echo off
setlocal enabledelayedexpansion

REM Todo List Application - Development Setup Script for Windows

echo 🚀 Setting up Todo List Application...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker first.
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Check if Java is installed
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ Java is not installed. Please install Java 17+ first.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Prerequisites check passed!

if "%1"=="setup" goto setup
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="status" goto status
if "%1"=="db" goto db
goto usage

:setup
echo 📦 Setting up backend...
cd backend
call mvnw.cmd dependency:go-offline
cd ..
echo ✅ Backend setup completed!

echo 📦 Setting up frontend...
cd frontend
call npm install
cd ..
echo ✅ Frontend setup completed!
goto end

:start
echo 🗄️ Starting database...
docker-compose -f docker-compose.dev.yml up -d

echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

echo 🔧 Starting backend...
cd backend
start "Todo Backend" cmd /c "mvnw.cmd spring-boot:run"
cd ..

echo ⏳ Waiting for backend to start...
timeout /t 15 /nobreak >nul

echo 🎨 Starting frontend...
cd frontend
start "Todo Frontend" cmd /c "npm run dev"
cd ..

call :showstatus
echo.
echo 🎉 Todo List Application is running!
echo Press any key to open the application in your browser...
pause >nul
start http://localhost:3000
goto end

:stop
echo 🛑 Stopping services...
taskkill /f /im "node.exe" >nul 2>&1
taskkill /f /im "java.exe" >nul 2>&1
docker-compose -f docker-compose.dev.yml down
echo ✅ All services stopped
goto end

:status
call :showstatus
goto end

:db
echo 🗄️ Starting database...
docker-compose -f docker-compose.dev.yml up -d
call :showstatus
goto end

:showstatus
echo 📊 Application Status:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8080/api
echo   pgAdmin: http://localhost:5050
echo.
echo Database Credentials:
echo   Host: localhost
echo   Port: 5432
echo   Database: todoapp
echo   Username: todouser
echo   Password: todopass
echo.
echo pgAdmin Credentials:
echo   Email: admin@todoapp.com
echo   Password: admin
goto :eof

:usage
echo Usage: %0 {setup^|start^|stop^|status^|db}
echo.
echo Commands:
echo   setup  - Setup dependencies for backend and frontend
echo   start  - Start the complete application ^(database, backend, frontend^)
echo   stop   - Stop all services
echo   status - Show application status and URLs
echo   db     - Start only the database
goto end

:end
