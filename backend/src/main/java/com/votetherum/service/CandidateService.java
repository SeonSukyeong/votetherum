//0820 추가
//0821 수정
package com.votetherum.service;

import com.votetherum.dto.CandidateDto;
import com.votetherum.dto.SupportResponseDto;
import com.votetherum.entity.Candidate;
import com.votetherum.entity.Election;
import com.votetherum.entity.User;
import com.votetherum.entity.Vote;
import com.votetherum.repository.CandidateRepository;
import com.votetherum.repository.ElectionRepository; // 추가된 Repository
import com.votetherum.repository.UserRepository; // 추가된 Repository
import com.votetherum.repository.VoteRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CandidateService {
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;
    private final UserRepository userRepository; // 추가된 필드
    private final ElectionRepository electionRepository; // 추가된 필드

    // 생성자: 모든 Repository 주입
    public CandidateService(CandidateRepository candidateRepository, VoteRepository voteRepository,
                            UserRepository userRepository, ElectionRepository electionRepository) {
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
        this.electionRepository = electionRepository;
    }

    // 특정 후보자에 대한 지원 수를 증가시키는 기능
    @Transactional
    public SupportResponseDto supportCandidate(Long candidateId) {
        candidateRepository.incrementSupportCount(candidateId);
        Candidate updatedCandidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid candidate ID"));
        return new SupportResponseDto(updatedCandidate.getId(), updatedCandidate.getSupportCount());
    }

    // 특정 사용자에게 투표 가능한 후보자 목록을 조회하는 기능 
    public List<CandidateDto> getAvailableCandidatesForUser(Long userId) {
        return candidateRepository.findAvailableCandidatesForUser(userId);
    }

    // 특정 선거의 후보자 목록을 조회하는 메서드
    public List<CandidateDto> getCandidatesByElectionId(Long electionId) {
        return candidateRepository.findCandidatesByElectionId(electionId);
    }

    // 새로 추가된 메서드: 특정 후보자에게 투표하는 기능
    @Transactional
    public void voteForCandidate(Long userId, Long electionId, Long candidateId) {
        // 사용자가 이미 해당 선거에 투표했는지 확인
        boolean hasVoted = voteRepository.hasUserVotedInElection(userId, electionId);
        if (hasVoted) {
            throw new IllegalArgumentException("이미 투표하셨습니다.");
        }

        // 후보자 및 기타 객체 조회
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid election ID"));
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid candidate ID"));

        // 후보자 득표수 증가
        candidateRepository.incrementSupportCount(candidateId);

        // 투표 기록 저장
        Vote vote = new Vote(election, user, candidate, "wallet_address_placeholder");
        voteRepository.save(vote);
    }
}