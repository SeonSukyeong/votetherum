package com.votetherum.repository;

import com.votetherum.entity.User; // 수정된 패키지 경로
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    //Optional<User> findById(Long id);
    Optional<User> findBySocialId(String socialId);
    boolean existsByUsername(String username);
    boolean existsBySocialId(String socialId);
}

//사용자 조회 메서드: username과 socialId를 기반으로 사용자를 조회할 수 있는 메서드를 제공합니다.
//중복 체크: 회원가입 시 중복된 username이나 socialId가 있는지 확인합니다.