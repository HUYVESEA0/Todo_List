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

1. **Clone Repository**
   ```bash
   git clone https://github.com/HUYVESEA0/Todo_List.git
   cd Todo_List
   ```

2. **Start Database**
   ```bash
   docker-compose up -d postgres
   ```

3. **Run Backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

4. **Run Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
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

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Happy Coding! 🎉**