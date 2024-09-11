//0820 추가
package com.votetherum.controller;

import com.votetherum.dto.ElectionDto;
import com.votetherum.dto.ElectionSearchResultDto;
import com.votetherum.dto.VoteRateDto;
import com.votetherum.service.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elections")
public class ElectionController {
    private final ElectionService electionService;

    @Autowired
    public ElectionController(ElectionService electionService) {
        this.electionService = electionService;
    }

    @GetMapping("/expired")
    public ResponseEntity<List<ElectionDto>> getExpiredElectionsByUserId(@RequestParam Long userId) {
        List<ElectionDto> elections = electionService.getExpiredElectionsByUserId(userId);
        return ResponseEntity.ok(elections);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ElectionSearchResultDto>> searchElections(@RequestParam String query) {
        List<ElectionSearchResultDto> results = electionService.searchElections(query);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{electionId}/vote-rates")
    public ResponseEntity<List<VoteRateDto>> getVoteRatesByElectionId(@PathVariable Long electionId) {
        List<VoteRateDto> voteRates = electionService.getVoteRatesByElectionId(electionId);
        return ResponseEntity.ok(voteRates);
    }

    @GetMapping("/available")
    public ResponseEntity<List<ElectionDto>> getAvailableElectionsForUser(@RequestParam Long userId) {
        List<ElectionDto> elections = electionService.getAvailableElectionsForUser(userId);
        return ResponseEntity.ok(elections);
    }

    @GetMapping("/available-public-elections")
    public ResponseEntity<List<ElectionDto>> getAvailablePublicElectionsByUserId(@RequestParam Long userId) {
        List<ElectionDto> elections = electionService.getAvailablePublicElectionsByUserId(userId);
        return ResponseEntity.ok(elections);
    }

    @GetMapping("/available-private-elections")
    public ResponseEntity<List<ElectionDto>> getAvailablePrivateElectionsByUserId(@RequestParam Long userId) {
        List<ElectionDto> elections = electionService.getAvailablePrivateElectionsByUserId(userId);
        return ResponseEntity.ok(elections);
    }
}