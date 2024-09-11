package com.votetherum.controller;

import com.votetherum.dto.VoteRequestDto;
import com.votetherum.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/elections")
public class VoteController {
    private final CandidateService candidateService;

    @Autowired
    public VoteController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping("/{electionId}/candidates/{candidateId}/vote")
    public ResponseEntity<String> voteForCandidate(
            @PathVariable Long electionId,
            @PathVariable Long candidateId,
            @RequestBody VoteRequestDto voteRequestDto) {
        candidateService.voteForCandidate(voteRequestDto.getUserId(), electionId, candidateId);
        return ResponseEntity.ok("투표가 완료되었습니다.");
    }
}
