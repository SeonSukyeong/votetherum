package com.votetherum.dto;

public class SupportResponseDto {
    private Long candidateId;
    private int updatedSupportCount;

    public SupportResponseDto(Long candidateId, int updatedSupportCount) {
        this.candidateId = candidateId;
        this.updatedSupportCount = updatedSupportCount;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public int getUpdatedSupportCount() {
        return updatedSupportCount;
    }

    public void setUpdatedSupportCount(int updatedSupportCount) {
        this.updatedSupportCount = updatedSupportCount;
    }
}
