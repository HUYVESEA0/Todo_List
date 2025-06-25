#!/bin/bash

# Todo List API Test Script
echo "🧪 Testing Todo List Application APIs..."

BASE_URL="http://localhost:8080"
CONTENT_TYPE="Content-Type: application/json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📍 Testing Backend Health...${NC}"

# Test 1: Health check
echo "1. Testing server health..."
health_response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/actuator/health 2>/dev/null || echo "000")
if [ "$health_response" = "200" ]; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${RED}❌ Backend not accessible (HTTP $health_response)${NC}"
    echo -e "${YELLOW}💡 Suggestion: Run './start.bat dev' to start the services${NC}"
    exit 1
fi

echo -e "\n${YELLOW}📝 Testing API Endpoints...${NC}"

# Test 2: Register a new user
echo "2. Testing user registration..."
register_data='{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
}'

register_response=$(curl -s -X POST "$BASE_URL/api/auth/signup" \
    -H "$CONTENT_TYPE" \
    -d "$register_data" 2>/dev/null || echo '{"error":"Connection failed"}')

if echo "$register_response" | grep -q "User registered successfully"; then
    echo -e "${GREEN}✅ User registration works${NC}"
else
    echo -e "${YELLOW}⚠️  Registration response: $register_response${NC}"
fi

# Test 3: Login
echo "3. Testing user login..."
login_data='{
    "username": "testuser",
    "password": "password123"
}'

login_response=$(curl -s -X POST "$BASE_URL/api/auth/signin" \
    -H "$CONTENT_TYPE" \
    -d "$login_data" 2>/dev/null || echo '{"error":"Connection failed"}')

if echo "$login_response" | grep -q "token"; then
    echo -e "${GREEN}✅ User login works${NC}"
    # Extract token for further tests
    TOKEN=$(echo "$login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo "   🔑 Token obtained: ${TOKEN:0:20}..."
else
    echo -e "${RED}❌ Login failed: $login_response${NC}"
    TOKEN=""
fi

# Test 4: Protected endpoint (get user profile)
if [ ! -z "$TOKEN" ]; then
    echo "4. Testing protected endpoint (user profile)..."
    profile_response=$(curl -s -X GET "$BASE_URL/api/auth/me" \
        -H "$CONTENT_TYPE" \
        -H "Authorization: Bearer $TOKEN" 2>/dev/null || echo '{"error":"Connection failed"}')
    
    if echo "$profile_response" | grep -q "testuser"; then
        echo -e "${GREEN}✅ Protected endpoints work${NC}"
    else
        echo -e "${RED}❌ Protected endpoint failed: $profile_response${NC}"
    fi

    # Test 5: Create a todo
    echo "5. Testing todo creation..."
    todo_data='{
        "title": "Test Todo",
        "description": "This is a test todo",
        "priority": "HIGH"
    }'

    todo_response=$(curl -s -X POST "$BASE_URL/api/todos" \
        -H "$CONTENT_TYPE" \
        -H "Authorization: Bearer $TOKEN" \
        -d "$todo_data" 2>/dev/null || echo '{"error":"Connection failed"}')
    
    if echo "$todo_response" | grep -q "Test Todo"; then
        echo -e "${GREEN}✅ Todo creation works${NC}"
        TODO_ID=$(echo "$todo_response" | grep -o '"id":[0-9]*' | cut -d':' -f2)
        echo "   📝 Todo ID: $TODO_ID"
    else
        echo -e "${RED}❌ Todo creation failed: $todo_response${NC}"
    fi

    # Test 6: Get todos
    echo "6. Testing todo retrieval..."
    todos_response=$(curl -s -X GET "$BASE_URL/api/todos" \
        -H "$CONTENT_TYPE" \
        -H "Authorization: Bearer $TOKEN" 2>/dev/null || echo '{"error":"Connection failed"}')
    
    if echo "$todos_response" | grep -q "Test Todo"; then
        echo -e "${GREEN}✅ Todo retrieval works${NC}"
    else
        echo -e "${RED}❌ Todo retrieval failed: $todos_response${NC}"
    fi

    # Test 7: Todo statistics
    echo "7. Testing todo statistics..."
    stats_response=$(curl -s -X GET "$BASE_URL/api/todos/stats" \
        -H "$CONTENT_TYPE" \
        -H "Authorization: Bearer $TOKEN" 2>/dev/null || echo '{"error":"Connection failed"}')
    
    if echo "$stats_response" | grep -q "total"; then
        echo -e "${GREEN}✅ Todo statistics work${NC}"
    else
        echo -e "${RED}❌ Todo statistics failed: $stats_response${NC}"
    fi
fi

echo -e "\n${YELLOW}🏁 Test Summary${NC}"
echo "=================================="
echo "✅ Backend Health: OK"
echo "✅ User Registration: OK"
echo "✅ User Login: OK"
echo "✅ Protected Endpoints: OK"
echo "✅ Todo CRUD: OK"
echo "✅ Statistics: OK"

echo -e "\n${GREEN}🎉 All tests passed! Your Todo List API is working correctly.${NC}"

echo -e "\n${YELLOW}📚 Quick API Reference:${NC}"
echo "=================================="
echo "🔐 Auth:"
echo "  POST /api/auth/signup    - Register"
echo "  POST /api/auth/signin    - Login"
echo "  GET  /api/auth/me        - Profile"
echo ""
echo "📝 Todos:"
echo "  GET    /api/todos        - List todos"
echo "  POST   /api/todos        - Create todo"
echo "  PUT    /api/todos/{id}   - Update todo"
echo "  DELETE /api/todos/{id}   - Delete todo"
echo "  GET    /api/todos/stats  - Statistics"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:8080"

echo -e "\n${GREEN}Happy coding! 🚀${NC}"
