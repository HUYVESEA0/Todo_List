# Todo List Application - Development Plan

## 📋 Project Overview
Todo List application với kiến trúc Full-stack:
- **Backend**: Java Spring Boot
- **Frontend**: React + Material-UI (MUI)
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT
- **Build Tool**: Maven/Gradle

## 🏗️ Architecture Overview
```
Frontend (React + MUI) ↔ REST API (Spring Boot) ↔ Database (PostgreSQL)
```

## 📁 Project Structure
```
todo-list-app/
├── backend/                    # Spring Boot Application
│   ├── src/main/java/com/todoapp/
│   │   ├── controller/        # REST Controllers
│   │   ├── service/          # Business Logic
│   │   ├── repository/       # Data Access Layer
│   │   ├── model/           # Entity Models
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── config/          # Configuration Classes
│   │   └── security/        # Security Configuration
│   ├── src/main/resources/
│   │   ├── application.yml  # App Configuration
│   │   └── data.sql        # Initial Data
│   └── pom.xml             # Maven Dependencies
├── frontend/                  # React Application
│   ├── src/
│   │   ├── components/      # Reusable Components
│   │   ├── pages/          # Page Components
│   │   ├── services/       # API Services
│   │   ├── utils/          # Utility Functions
│   │   ├── hooks/          # Custom Hooks
│   │   └── theme/          # MUI Theme Configuration
│   ├── public/
│   └── package.json
└── docker-compose.yml        # Development Environment
```

## 🔧 Backend Development (Spring Boot)

### Dependencies
```xml
<!-- Core Spring Boot -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### Core Models
1. **User Entity**
   - id, username, email, password, roles
   - Created/Updated timestamps

2. **Todo Entity**
   - id, title, description, completed, priority
   - User relationship (Many-to-One)
   - Created/Updated timestamps

3. **Category Entity** (Optional)
   - id, name, color
   - User relationship

### API Endpoints
```
Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh

Todos:
GET    /api/todos              # Get user's todos
POST   /api/todos              # Create new todo
PUT    /api/todos/{id}         # Update todo
DELETE /api/todos/{id}         # Delete todo
PATCH  /api/todos/{id}/toggle  # Toggle completion

Categories:
GET    /api/categories         # Get user's categories
POST   /api/categories         # Create category
PUT    /api/categories/{id}    # Update category
DELETE /api/categories/{id}    # Delete category
```

## 🎨 Frontend Development (React + MUI)

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.14.0",
    "@mui/icons-material": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "react-router-dom": "^6.14.0",
    "axios": "^1.4.0",
    "react-query": "^3.39.0",
    "formik": "^2.4.0",
    "yup": "^1.2.0",
    "date-fns": "^2.30.0"
  }
}
```

### Key Components
1. **Authentication**
   - LoginForm
   - RegisterForm
   - ProtectedRoute

2. **Todo Management**
   - TodoList
   - TodoItem
   - TodoForm
   - TodoFilter

3. **Layout**
   - Header/Navigation
   - Sidebar
   - Footer

4. **UI Components**
   - Custom themed MUI components
   - Loading states
   - Error boundaries

### Pages Structure
```
/login           # Login page
/register        # Registration page
/dashboard       # Main todo dashboard
/profile         # User profile
/settings        # App settings
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Todos Table
```sql
CREATE TABLE todos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    due_date TIMESTAMP,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) DEFAULT '#1976d2',
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Development Phases

### Phase 1: Backend Setup (Week 1)
- [ ] Initialize Spring Boot project
- [ ] Configure database connection
- [ ] Create basic entities and repositories
- [ ] Implement authentication with JWT
- [ ] Create basic CRUD operations for todos

### Phase 2: Frontend Setup (Week 2)
- [ ] Initialize React project with Vite
- [ ] Setup MUI theme and components
- [ ] Implement routing with React Router
- [ ] Create authentication forms
- [ ] Setup API service layer

### Phase 3: Core Features (Week 3)
- [ ] Todo CRUD operations
- [ ] Todo filtering and sorting
- [ ] Category management
- [ ] Responsive design
- [ ] Error handling

### Phase 4: Advanced Features (Week 4)
- [ ] Search functionality
- [ ] Drag & drop for todos
- [ ] Due date reminders
- [ ] Data export/import
- [ ] Dark/Light theme toggle

### Phase 5: Testing & Deployment (Week 5)
- [ ] Unit tests (Backend & Frontend)
- [ ] Integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Production deployment

## 🛠️ Required VS Code Extensions

### Essential Extensions
1. **Java Development**
   - Extension Pack for Java (Microsoft)
   - Spring Boot Extension Pack (VMware)
   - Gradle for Java (Microsoft)

2. **Frontend Development**
   - ES7+ React/Redux/React-Native snippets
   - Auto Rename Tag
   - Bracket Pair Colorizer
   - Prettier - Code formatter
   - ESLint

3. **Database**
   - SQLTools
   - PostgreSQL (if using PostgreSQL)

4. **General Development**
   - GitLens
   - Thunder Client (API testing)
   - Docker
   - Live Share

### Optional but Recommended
- Material Icon Theme
- Error Lens
- TODO Highlight
- Rest Client
- Code Spell Checker

## 🐳 Docker Configuration

### docker-compose.yml for Development
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: todoapp
      POSTGRES_USER: todouser
      POSTGRES_PASSWORD: todopass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/todoapp

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## 📝 Implementation Guidelines

### Backend Best Practices
- Use DTOs for API responses
- Implement proper exception handling
- Add request validation
- Use pagination for large datasets
- Implement proper logging
- Follow REST API conventions

### Frontend Best Practices
- Use custom hooks for API calls
- Implement proper error boundaries
- Use React.memo for performance
- Implement loading states
- Follow MUI design principles
- Use TypeScript for better type safety

### Security Considerations
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting
- Secure password hashing

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for services and repositories
- Integration tests for controllers
- Security tests for authentication
- Database tests with TestContainers

### Frontend Testing
- Component testing with React Testing Library
- Unit tests for utilities and hooks
- Integration tests for user flows
- E2E tests with Cypress

## 📊 Performance Optimization

### Backend
- Database indexing
- Query optimization
- Caching with Redis
- Connection pooling

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization

## 🚀 Deployment Strategy

### Development
- Local development with Docker Compose
- Hot reloading for both frontend and backend

### Production
- Containerized deployment
- Environment-specific configurations
- Database migrations
- Health checks and monitoring

---

## Next Steps
1. Setup development environment
2. Install required VS Code extensions
3. Initialize Spring Boot backend project
4. Initialize React frontend project
5. Setup database with Docker
6. Begin Phase 1 development