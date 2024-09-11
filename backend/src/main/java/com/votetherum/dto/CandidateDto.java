//0821 추가
//electionName과 candidateName을 포함한 후보자 정보를 담음
package com.votetherum.dto;

public class CandidateDto {
    private String electionName;
    private String candidateName;

    public CandidateDto(String electionName, String candidateName) {
        this.electionName = electionName;
        this.candidateName = candidateName;
    }

    // Getters and Setters
    public String getElectionName() {
        return electionName;
    }

    public void setElectionName(String electionName) {
        this.electionName = electionName;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }
}
