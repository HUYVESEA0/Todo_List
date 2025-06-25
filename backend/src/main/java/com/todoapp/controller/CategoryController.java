package com.todoapp.controller;

import com.todoapp.dto.CategoryRequest;
import com.todoapp.model.Category;
import com.todoapp.service.AuthService;
import com.todoapp.service.CategoryService;
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
@RequestMapping("/api/categories")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam(required = false) String search) {
        try {
            Long userId = authService.getCurrentUserId();
            List<Category> categories;

            if (search != null && !search.trim().isEmpty()) {
                categories = categoryService.searchCategories(search.trim(), userId);
            } else {
                categories = categoryService.getAllCategoriesByUser(userId);
            }

            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        try {
            Long userId = authService.getCurrentUserId();
            Optional<Category> category = categoryService.getCategoryById(id, userId);
            
            if (category.isPresent()) {
                return ResponseEntity.ok(category.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        try {
            Long userId = authService.getCurrentUserId();
            Category category = categoryService.createCategory(categoryRequest, userId);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest categoryRequest) {
        try {
            Long userId = authService.getCurrentUserId();
            Category category = categoryService.updateCategory(id, categoryRequest, userId);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            Long userId = authService.getCurrentUserId();
            categoryService.deleteCategory(id, userId);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Category deleted successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getCategoryStats() {
        try {
            Long userId = authService.getCurrentUserId();
            
            Map<String, Long> stats = new HashMap<>();
            stats.put("total", categoryService.getTotalCategories(userId));
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
