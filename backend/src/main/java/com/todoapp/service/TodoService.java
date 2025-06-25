package com.todoapp.service;

import com.todoapp.dto.TodoRequest;
import com.todoapp.model.Category;
import com.todoapp.model.Todo;
import com.todoapp.model.User;
import com.todoapp.repository.CategoryRepository;
import com.todoapp.repository.TodoRepository;
import com.todoapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Todo> getAllTodosByUser(Long userId) {
        return todoRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Optional<Todo> getTodoById(Long id, Long userId) {
        return todoRepository.findByIdAndUserId(id, userId);
    }

    public Todo createTodo(TodoRequest todoRequest, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Todo todo = new Todo();
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setPriority(todoRequest.getPriority());
        todo.setDueDate(todoRequest.getDueDate());
        todo.setUser(user);

        if (todoRequest.getCategoryId() != null) {
            Category category = categoryRepository.findByIdAndUserId(todoRequest.getCategoryId(), userId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            todo.setCategory(category);
        }

        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, TodoRequest todoRequest, Long userId) {
        Todo todo = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setPriority(todoRequest.getPriority());
        todo.setDueDate(todoRequest.getDueDate());

        if (todoRequest.getCategoryId() != null) {
            Category category = categoryRepository.findByIdAndUserId(todoRequest.getCategoryId(), userId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            todo.setCategory(category);
        } else {
            todo.setCategory(null);
        }

        return todoRepository.save(todo);
    }

    public Todo toggleTodo(Long id, Long userId) {
        Todo todo = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setCompleted(!todo.getCompleted());
        
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id, Long userId) {
        Todo todo = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        
        todoRepository.delete(todo);
    }

    public List<Todo> searchTodos(String query, Long userId) {
        return todoRepository.searchTodosByUser(userId, query);
    }

    public List<Todo> getTodosByCompleted(Boolean completed, Long userId) {
        return todoRepository.findByUserIdAndCompletedOrderByCreatedAtDesc(userId, completed);
    }

    public List<Todo> getTodosDueToday(Long userId) {
        return todoRepository.findTodosDueToday(userId, LocalDateTime.now());
    }

    public List<Todo> getOverdueTodos(Long userId) {
        return todoRepository.findOverdueTodos(userId, LocalDateTime.now());
    }

    public long getTotalTodos(Long userId) {
        return todoRepository.countTodosByUser(userId);
    }

    public long getCompletedTodos(Long userId) {
        return todoRepository.countCompletedTodosByUser(userId);
    }

    public long getPendingTodos(Long userId) {
        return todoRepository.countPendingTodosByUser(userId);
    }
}
