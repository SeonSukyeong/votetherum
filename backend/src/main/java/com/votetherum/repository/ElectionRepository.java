//0820 추가
package com.votetherum.repository;

import com.votetherum.dto.CandidateVoteResultDto;
import com.votetherum.dto.ElectionDto;
import com.votetherum.dto.ElectionSearchResultDto;
import com.votetherum.dto.VoteRateDto;
import com.votetherum.entity.Election;
import com.votetherum.entity.Candidate; // 추가된 import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {

    @Query("SELECT new com.votetherum.dto.ElectionDto(e.id, e.name, e.endDate) " +
           "FROM Election e " +
           "WHERE e.isPrivate = FALSE AND e.endDate > CURRENT_TIMESTAMP AND " +
           "NOT EXISTS (SELECT v FROM Vote v WHERE v.election.id = e.id AND v.user.id = :userId)")
    List<ElectionDto> findAvailablePublicElectionsByUserId(@Param("userId") Long userId);

    @Query("SELECT new com.votetherum.dto.ElectionDto(e.id, e.name, e.endDate) " +
           "FROM Election e " +
           "WHERE e.isPrivate = TRUE AND e.endDate > CURRENT_TIMESTAMP AND " +
           "NOT EXISTS (SELECT v FROM Vote v WHERE v.election.id = e.id AND v.user.id = :userId)")
    List<ElectionDto> findAvailablePrivateElectionsByUserId(@Param("userId") Long userId);

    @Query("SELECT new com.votetherum.dto.ElectionDto(e.id, e.name, e.endDate, e.isPrivate) " +
           "FROM Election e " +
           "LEFT JOIN Vote v ON e.id = v.election.id AND v.user.id = :userId " +
           "WHERE e.endDate < CURRENT_TIMESTAMP " +
           "GROUP BY e.id")
    List<ElectionDto> findExpiredElectionsByUserId(@Param("userId") Long userId);

    @Query("SELECT new com.votetherum.dto.CandidateVoteResultDto(c.id, c.name, c.supportCount, " +
           "(c.supportCount / (SELECT SUM(c2.supportCount) FROM Candidate c2 WHERE c2.election.id = :electionId)) * 100) " +
           "FROM Candidate c WHERE c.election.id = :electionId")
    List<CandidateVoteResultDto> findCandidateVoteResultsByElectionId(@Param("electionId") Long electionId);

    @Query("SELECT new com.votetherum.dto.ElectionSearchResultDto(e.id, e.name, e.endDate, " +
           "CASE WHEN e.endDate > CURRENT_TIMESTAMP THEN '진행 중' ELSE '종료됨' END) " +
           "FROM Election e WHERE e.name LIKE %:query%")
    List<ElectionSearchResultDto> searchByKeyword(@Param("query") String query);

    @Query("SELECT new com.votetherum.dto.VoteRateDto(c.id, c.name, c.supportCount, " +
           "(c.supportCount / (SELECT COALESCE(SUM(c2.supportCount), 1) FROM Candidate c2 WHERE c2.election.id = :electionId)) * 100) " +
           "FROM Candidate c WHERE c.election.id = :electionId " +
           "AND c.election.endDate > CURRENT_TIMESTAMP")
    List<VoteRateDto> findVoteRatesByElectionId(@Param("electionId") Long electionId);

    @Query("SELECT new com.votetherum.dto.ElectionDto(e.id, e.name, e.endDate) " +
           "FROM Election e " +
           "WHERE e.startDate <= CURRENT_TIMESTAMP " +
           "AND e.endDate > CURRENT_TIMESTAMP " +
           "AND e.id NOT IN (SELECT v.election.id FROM Vote v WHERE v.user.id = :userId)")
    List<ElectionDto> findAvailableElectionsForUser(@Param("userId") Long userId);
    
    // 추가된 메서드: 특정 후보자의 응원수를 증가시키는 메서드
    @Modifying
    @Transactional
    @Query("UPDATE Candidate c SET c.supportCount = c.supportCount + 1 WHERE c.id = :candidateId")
    void incrementSupportCount(@Param("candidateId") Long candidateId);
}
