//0820 추가
package com.votetherum.repository;

import com.votetherum.dto.CandidateDto;
import com.votetherum.entity.Candidate; // 수정된 import
import com.votetherum.entity.Vote; // Vote 엔티티가 필요할 경우 추가

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    //특정 사용자에게 투표 가능한 후보자를 조회하는 기능

    @Query("SELECT new com.votetherum.dto.CandidateDto(e.name, c.name, c.supportCount, e.isPrivate) " +
           "FROM Candidate c " +
           "JOIN c.election e " +
           "WHERE e.startDate <= CURRENT_TIMESTAMP " +
           "AND e.endDate > CURRENT_TIMESTAMP " +
           "AND e.isPrivate = FALSE " +
           "AND e.id IN (SELECT v.election.id FROM Vote v WHERE v.user.id = :userId)")
    List<CandidateDto> findAvailableCandidatesForUser(@Param("userId") Long userId);

    //특정 선거에 등록된 후보자 목록을 조회하는 기능
    @Query("SELECT new com.votetherum.dto.CandidateDto(e.name, c.name) " +
           "FROM Candidate c JOIN c.election e " +
           "WHERE e.id = :electionId")
    List<CandidateDto> findCandidatesByElectionId(@Param("electionId") Long electionId);

    // 특정 후보자의 득표수를 증가시키는 기능
    @Modifying
    @Query("UPDATE Candidate c SET c.supportCount = c.supportCount + 1 WHERE c.id = :candidateId")
    void incrementSupportCount(@Param("candidateId") Long candidateId);
    
}
