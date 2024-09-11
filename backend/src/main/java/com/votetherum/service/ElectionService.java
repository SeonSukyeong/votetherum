//0820 추가
package com.votetherum.service;

import com.votetherum.dto.CandidateVoteResultDto;
import com.votetherum.dto.ElectionDto;
import com.votetherum.dto.ElectionSearchResultDto;
import com.votetherum.dto.VoteRateDto;
import com.votetherum.repository.ElectionRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ElectionService {
    private final ElectionRepository electionRepository;

    public ElectionService(ElectionRepository electionRepository) {
        this.electionRepository = electionRepository;
    }

    public List<ElectionDto> getExpiredElectionsByUserId(Long userId) {
        return electionRepository.findExpiredElectionsByUserId(userId);
    }

    public List<CandidateVoteResultDto> getCandidateVoteResultsByElectionId(Long electionId) {
        return electionRepository.findCandidateVoteResultsByElectionId(electionId);
    }

    public List<ElectionSearchResultDto> searchElections(String query) {
        return electionRepository.searchByKeyword(query);
    }

    public List<VoteRateDto> getVoteRatesByElectionId(Long electionId) {
        return electionRepository.findVoteRatesByElectionId(electionId);
    }

    public List<ElectionDto> getAvailableElectionsForUser(Long userId) {
        return electionRepository.findAvailableElectionsForUser(userId);
    }

    //공개투표, 지정투표

    public List<ElectionDto> getAvailablePublicElectionsByUserId(Long userId) {
        return electionRepository.findAvailablePublicElectionsByUserId(userId);
    }

    public List<ElectionDto> getAvailablePrivateElectionsByUserId(Long userId) {
        return electionRepository.findAvailablePrivateElectionsByUserId(userId);
    }
}
