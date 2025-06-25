package com.todoapp.controller;

import com.todoapp.dto.TodoRequest;
import com.todoapp.model.Todo;
import com.todoapp.service.AuthService;
import com.todoapp.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/todos")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) String search) {
        try {
            Long userId = authService.getCurrentUserId();
            List<Todo> todos;

            if (search != null && !search.trim().isEmpty()) {
                todos = todoService.searchTodos(search.trim(), userId);
            } else if (completed != null) {
                todos = todoService.getTodosByCompleted(completed, userId);
            } else {
                todos = todoService.getAllTodosByUser(userId);
            }

            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        try {
            Long userId = authService.getCurrentUserId();
            Optional<Todo> todo = todoService.getTodoById(id, userId);
            
            if (todo.isPresent()) {
                return ResponseEntity.ok(todo.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createTodo(@Valid @RequestBody TodoRequest todoRequest) {
        try {
            Long userId = authService.getCurrentUserId();
            Todo todo = todoService.createTodo(todoRequest, userId);
            return ResponseEntity.ok(todo);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoRequest todoRequest) {
        try {
            Long userId = authService.getCurrentUserId();
            Todo todo = todoService.updateTodo(id, todoRequest, userId);
            return ResponseEntity.ok(todo);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggleTodo(@PathVariable Long id) {
        try {
            Long userId = authService.getCurrentUserId();
            Todo todo = todoService.toggleTodo(id, userId);
            return ResponseEntity.ok(todo);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        try {
            Long userId = authService.getCurrentUserId();
            todoService.deleteTodo(id, userId);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Todo deleted successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/due-today")
    public ResponseEntity<List<Todo>> getTodosDueToday() {
        try {
            Long userId = authService.getCurrentUserId();
            List<Todo> todos = todoService.getTodosDueToday(userId);
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Todo>> getOverdueTodos() {
        try {
            Long userId = authService.getCurrentUserId();
            List<Todo> todos = todoService.getOverdueTodos(userId);
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getTodoStats() {
        try {
            Long userId = authService.getCurrentUserId();
            
            Map<String, Long> stats = new HashMap<>();
            stats.put("total", todoService.getTotalTodos(userId));
            stats.put("completed", todoService.getCompletedTodos(userId));
            stats.put("pending", todoService.getPendingTodos(userId));
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
