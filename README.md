# Todo List Application

🚀 **Full-Stack Todo List Application** với Java Spring Boot + React + Material-UI

## 📋 Tech Stack

- **Backend**: Java Spring Boot, Spring Security, JPA/Hibernate
- **Frontend**: React, Material-UI (MUI), Axios
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Build Tools**: Maven (Backend), Vite (Frontend)
- **Containerization**: Docker & Docker Compose

## 🏗️ Architecture

```
Frontend (React + MUI) ↔ REST API (Spring Boot) ↔ Database (PostgreSQL)
```

## 🛠️ Prerequisites

- Java 17+
- Node.js 18+
- Docker & Docker Compose
- VS Code với các extensions đã cài đặt

## 📦 VS Code Extensions Đã Cài Đặt

### Java & Spring Boot
- ✅ Spring Boot Extension Pack
- ✅ Extension Pack for Java
- ✅ Spring Boot Tools
- ✅ Spring Boot Dashboard

### Frontend Development
- ✅ ES7+ React/Redux/React-Native snippets
- ✅ ESLint
- ✅ Prettier - Code formatter
- ✅ MUI Snippets

### Database & DevOps
- ✅ SQLTools
- ✅ SQLTools PostgreSQL Driver
- ✅ PostgreSQL
- ✅ Docker
- ✅ YAML

## 🚀 Quick Start

### 📋 Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Git

### 🛠️ Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/HUYVESEA0/Todo_List.git
   cd Todo_List
   ```

2. **Setup Dependencies**
   ```bash
   # Windows
   start.bat setup
   
   # Linux/Mac
   chmod +x start.sh
   ./start.sh setup
   ```

3. **Start Application**
   ```bash
   # Windows
   start.bat start
   
   # Linux/Mac
   ./start.sh start
   ```

4. **Open Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - pgAdmin: http://localhost:5050

### 🐳 Docker Commands

```bash
# Start only database
docker-compose -f docker-compose.dev.yml up -d

# Start full application with Docker
docker-compose up -d

# Stop services
docker-compose down
```

## 📁 Project Structure

```
todo-list-app/
├── backend/                # Spring Boot API
├── frontend/              # React Application  
├── docker-compose.yml     # Development Environment
├── PLAN.md               # Development Plan
└── README.md            # This file
```

## 🔧 Development

Xem chi tiết trong `PLAN.md` để biết:
- Cấu trúc dự án chi tiết
- API endpoints
- Database schema
- Development phases
- Best practices

## 📝 Features

- [x] User Authentication (JWT)
- [x] Todo CRUD Operations
- [x] Categories Management
- [x] Responsive Design (MUI)
- [x] RESTful API
- [x] Database Integration
- [ ] Search & Filter
- [ ] Drag & Drop
- [ ] Due Date Reminders
- [ ] Dark/Light Theme

## ✅ Completed Features

### Backend (Spring Boot)
- **Complete Service Layer**: TodoService, CategoryService, AuthService với đầy đủ business logic
- **REST API Controllers**: 
  - `AuthController`: Authentication endpoints (login, register, profile management)
  - `TodoController`: CRUD operations cho todos với filtering, search, stats
  - `CategoryController`: CRUD operations cho categories
- **Global Exception Handling**: Custom error responses và validation
- **Security Configuration**: JWT authentication với proper role-based access
- **Database Models**: Complete entities với relationships
- **Repository Layer**: Custom queries cho advanced features

### Frontend (React + MUI)
- **Authentication UI**: Complete login/register forms với validation
- **Dashboard**: Modern dashboard với statistics cards
- **Todo Management**: Full CRUD interface với search, filter, priority
- **Responsive Design**: Mobile-friendly Material-UI components
- **Routing**: Protected routes với automatic redirects
- **State Management**: Custom hooks cho async operations
- **Theme Support**: Consistent Material-UI theming

### API Endpoints Completed

#### Authentication
```
POST /api/auth/signin       - User login
POST /api/auth/signup       - User registration  
GET  /api/auth/me          - Get current user profile
PUT  /api/auth/profile     - Update user profile
POST /api/auth/change-password - Change password
GET  /api/auth/check-username  - Check username availability
GET  /api/auth/check-email     - Check email availability
POST /api/auth/signout         - User logout
```

#### Todos
```
GET    /api/todos              - Get all todos (with filters: completed, search)
GET    /api/todos/{id}         - Get todo by ID
POST   /api/todos              - Create new todo
PUT    /api/todos/{id}         - Update todo
PATCH  /api/todos/{id}/toggle  - Toggle todo completion
DELETE /api/todos/{id}         - Delete todo
GET    /api/todos/due-today    - Get todos due today
GET    /api/todos/overdue      - Get overdue todos
GET    /api/todos/stats        - Get todo statistics
```

#### Categories
```
GET    /api/categories         - Get all categories (with search)
GET    /api/categories/{id}    - Get category by ID
POST   /api/categories         - Create new category
PUT    /api/categories/{id}    - Update category
DELETE /api/categories/{id}    - Delete category
GET    /api/categories/stats   - Get category statistics
```

## 🚀 Current Status

**Backend**: ✅ **100% Complete**
- All core features implemented
- Full API documentation
- Security & validation ready
- Ready for production

**Frontend**: ✅ **90% Complete**  
- Core UI components done
- Authentication flow working
- Todo management interface
- Responsive design implemented

**Missing Frontend Features**:
- Category management UI
- User profile page  
- Advanced filtering UI
- Todo due date notifications
- Bulk operations UI

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Happy Coding! 🎉**