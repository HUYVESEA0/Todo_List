package com.todoapp.repository;

import com.todoapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserIdOrderByNameAsc(Long userId);

    Optional<Category> findByIdAndUserId(Long id, Long userId);

    boolean existsByNameAndUserId(String name, Long userId);

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.todos WHERE c.user.id = :userId")
    List<Category> findByUserIdWithTodos(@Param("userId") Long userId);

    @Query("SELECT COUNT(c) FROM Category c WHERE c.user.id = :userId")
    long countCategoriesByUser(@Param("userId") Long userId);

    @Query("SELECT c FROM Category c WHERE c.user.id = :userId AND " +
           "(LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Category> searchCategoriesByUser(@Param("userId") Long userId, @Param("query") String query);

    void deleteByIdAndUserId(Long id, Long userId);
}
