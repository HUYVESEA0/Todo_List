#!/bin/bash

# Todo List Application - Development Setup Script

echo "🚀 Setting up Todo List Application..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Function to setup backend
setup_backend() {
    echo "📦 Setting up backend..."
    cd backend
    
    # Make mvnw executable
    chmod +x mvnw
    
    # Download dependencies
    ./mvnw dependency:go-offline
    
    echo "✅ Backend setup completed!"
    cd ..
}

# Function to setup frontend
setup_frontend() {
    echo "📦 Setting up frontend..."
    cd frontend
    
    # Install dependencies
    npm install
    
    echo "✅ Frontend setup completed!"
    cd ..
}

# Function to start database
start_database() {
    echo "🗄️ Starting database..."
    docker-compose -f docker-compose.dev.yml up -d
    
    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    sleep 10
    
    echo "✅ Database is running!"
}

# Function to start backend
start_backend() {
    echo "🔧 Starting backend..."
    cd backend
    ./mvnw spring-boot:run &
    BACKEND_PID=$!
    echo $BACKEND_PID > backend.pid
    cd ..
    echo "✅ Backend started with PID: $BACKEND_PID"
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting frontend..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > frontend.pid
    cd ..
    echo "✅ Frontend started with PID: $FRONTEND_PID"
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping services..."
    
    # Stop frontend
    if [ -f frontend/frontend.pid ]; then
        FRONTEND_PID=$(cat frontend/frontend.pid)
        kill $FRONTEND_PID 2>/dev/null
        rm frontend/frontend.pid
        echo "✅ Frontend stopped"
    fi
    
    # Stop backend
    if [ -f backend/backend.pid ]; then
        BACKEND_PID=$(cat backend/backend.pid)
        kill $BACKEND_PID 2>/dev/null
        rm backend/backend.pid
        echo "✅ Backend stopped"
    fi
    
    # Stop database
    docker-compose -f docker-compose.dev.yml down
    echo "✅ Database stopped"
}

# Function to show status
show_status() {
    echo "📊 Application Status:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:8080/api"
    echo "  pgAdmin: http://localhost:5050"
    echo ""
    echo "Database Credentials:"
    echo "  Host: localhost"
    echo "  Port: 5432"
    echo "  Database: todoapp"
    echo "  Username: todouser"
    echo "  Password: todopass"
    echo ""
    echo "pgAdmin Credentials:"
    echo "  Email: admin@todoapp.com"
    echo "  Password: admin"
}

# Main script logic
case "$1" in
    "setup")
        setup_backend
        setup_frontend
        ;;
    "start")
        start_database
        sleep 5
        start_backend
        sleep 10
        start_frontend
        show_status
        echo ""
        echo "🎉 Todo List Application is running!"
        echo "Press Ctrl+C to stop all services"
        
        # Wait for user interrupt
        trap stop_services INT
        wait
        ;;
    "stop")
        stop_services
        ;;
    "status")
        show_status
        ;;
    "db")
        start_database
        show_status
        ;;
    *)
        echo "Usage: $0 {setup|start|stop|status|db}"
        echo ""
        echo "Commands:"
        echo "  setup  - Setup dependencies for backend and frontend"
        echo "  start  - Start the complete application (database, backend, frontend)"
        echo "  stop   - Stop all services"
        echo "  status - Show application status and URLs"
        echo "  db     - Start only the database"
        exit 1
        ;;
esac
