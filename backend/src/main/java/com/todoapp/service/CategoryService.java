package com.todoapp.service;

import com.todoapp.dto.CategoryRequest;
import com.todoapp.model.Category;
import com.todoapp.model.User;
import com.todoapp.repository.CategoryRepository;
import com.todoapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Category> getAllCategoriesByUser(Long userId) {
        return categoryRepository.findByUserIdOrderByNameAsc(userId);
    }

    public Optional<Category> getCategoryById(Long id, Long userId) {
        return categoryRepository.findByIdAndUserId(id, userId);
    }

    public Category createCategory(CategoryRequest categoryRequest, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if category name already exists for this user
        if (categoryRepository.existsByNameAndUserId(categoryRequest.getName(), userId)) {
            throw new RuntimeException("Category with this name already exists");
        }

        Category category = new Category();
        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());
        category.setColor(categoryRequest.getColor());
        category.setUser(user);

        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, CategoryRequest categoryRequest, Long userId) {
        Category category = categoryRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Check if category name already exists for this user (excluding current category)
        if (!category.getName().equals(categoryRequest.getName()) && 
            categoryRepository.existsByNameAndUserId(categoryRequest.getName(), userId)) {
            throw new RuntimeException("Category with this name already exists");
        }

        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());
        category.setColor(categoryRequest.getColor());

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id, Long userId) {
        Category category = categoryRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Check if category is in use
        if (category.getTodos() != null && !category.getTodos().isEmpty()) {
            throw new RuntimeException("Cannot delete category with existing todos");
        }

        categoryRepository.delete(category);
    }

    public long getTotalCategories(Long userId) {
        return categoryRepository.countCategoriesByUser(userId);
    }

    public List<Category> searchCategories(String query, Long userId) {
        return categoryRepository.searchCategoriesByUser(userId, query);
    }
}
