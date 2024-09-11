package com.votetherum.repository;

import com.votetherum.entity.Vote; // 수정된 패키지 경로
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT COUNT(v) > 0 FROM Vote v WHERE v.user.id = :userId AND v.election.id = :electionId")
    boolean hasUserVotedInElection(@Param("userId") Long userId, @Param("electionId") Long electionId);
}
//투표 했는지 안했는지 여부 확인