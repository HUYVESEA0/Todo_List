package com.todoapp.repository;

import com.todoapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.todos WHERE u.id = :id")
    Optional<User> findByIdWithTodos(@Param("id") Long id);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.categories WHERE u.id = :id")
    Optional<User> findByIdWithCategories(@Param("id") Long id);
}
