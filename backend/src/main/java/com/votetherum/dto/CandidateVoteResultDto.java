//0820 추가
package com.votetherum.dto;

public class CandidateVoteResultDto {
    private Long candidateId;
    private String name;
    private int supportCount;
    private double voteRate;

    public CandidateVoteResultDto(Long candidateId, String name, int supportCount, double voteRate) {
        this.candidateId = candidateId;
        this.name = name;
        this.supportCount = supportCount;
        this.voteRate = voteRate;
    }

    // Getters and Setters
    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSupportCount() {
        return supportCount;
    }

    public void setSupportCount(int supportCount) {
        this.supportCount = supportCount;
    }

    public double getVoteRate() {
        return voteRate;
    }

    public void setVoteRate(double voteRate) {
        this.voteRate = voteRate;
    }
}
