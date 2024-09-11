package com.votetherum.controller;

import com.votetherum.dto.CandidateDto;
import com.votetherum.dto.CandidateVoteResultDto;
import com.votetherum.dto.SupportResponseDto;
import com.votetherum.service.CandidateService;
import com.votetherum.service.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;
    private final ElectionService electionService;

    @Autowired
    public CandidateController(CandidateService candidateService, ElectionService electionService) {
        this.candidateService = candidateService;
        this.electionService = electionService;
    }

    @GetMapping("/{electionId}")
    public ResponseEntity<List<CandidateDto>> getCandidatesByElectionId(@PathVariable Long electionId) {
        List<CandidateDto> candidates = candidateService.getCandidatesByElectionId(electionId);
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/{electionId}/vote-results")
    public ResponseEntity<List<CandidateVoteResultDto>> getCandidateVoteResultsByElectionId(@PathVariable Long electionId) {
        List<CandidateVoteResultDto> results = electionService.getCandidateVoteResultsByElectionId(electionId);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/{candidateId}/support")
    public ResponseEntity<SupportResponseDto> supportCandidate(@PathVariable Long candidateId) {
        SupportResponseDto response = candidateService.supportCandidate(candidateId);
        return ResponseEntity.ok(response);
    }
}