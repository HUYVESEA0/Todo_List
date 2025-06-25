package com.todoapp.repository;

import com.todoapp.model.Todo;
import com.todoapp.model.Priority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUserIdOrderByCreatedAtDesc(Long userId);

    Page<Todo> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    List<Todo> findByUserIdAndCompletedOrderByCreatedAtDesc(Long userId, Boolean completed);

    List<Todo> findByUserIdAndPriorityOrderByCreatedAtDesc(Long userId, Priority priority);

    List<Todo> findByUserIdAndCategoryIdOrderByCreatedAtDesc(Long userId, Long categoryId);

    @Query("SELECT t FROM Todo t WHERE t.user.id = :userId AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Todo> searchTodosByUser(@Param("userId") Long userId, @Param("search") String search);

    @Query("SELECT t FROM Todo t WHERE t.user.id = :userId AND t.dueDate BETWEEN :start AND :end")
    List<Todo> findTodosByDueDateRange(@Param("userId") Long userId, 
                                       @Param("start") LocalDateTime start, 
                                       @Param("end") LocalDateTime end);

    @Query("SELECT t FROM Todo t WHERE t.user.id = :userId AND t.dueDate < :now AND t.completed = false")
    List<Todo> findOverdueTodos(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Query("SELECT t FROM Todo t WHERE t.user.id = :userId AND DATE(t.dueDate) = DATE(:today)")
    List<Todo> findTodosDueToday(@Param("userId") Long userId, @Param("today") LocalDateTime today);

    @Query("SELECT COUNT(t) FROM Todo t WHERE t.user.id = :userId")
    long countTodosByUser(@Param("userId") Long userId);

    @Query("SELECT COUNT(t) FROM Todo t WHERE t.user.id = :userId AND t.completed = true")
    long countCompletedTodosByUser(@Param("userId") Long userId);

    @Query("SELECT COUNT(t) FROM Todo t WHERE t.user.id = :userId AND t.completed = false")
    long countPendingTodosByUser(@Param("userId") Long userId);

    Optional<Todo> findByIdAndUserId(Long id, Long userId);

    void deleteByIdAndUserId(Long id, Long userId);
}
