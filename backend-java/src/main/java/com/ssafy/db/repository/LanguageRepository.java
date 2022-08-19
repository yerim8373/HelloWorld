package com.ssafy.db.repository;


import com.ssafy.db.entity.Language;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LanguageRepository extends JpaRepository<Language, Long> {
    @Query("select l from UserLan ul join fetch User u join fetch Language l where u.id = :userId and ul.priority = 1")
    Language findLanguageByUserId(@Param("userId") Long userId);


}

