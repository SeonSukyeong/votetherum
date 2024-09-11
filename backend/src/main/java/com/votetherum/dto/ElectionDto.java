//0820 추가
package com.votetherum.dto;

import java.time.LocalDateTime;

public class ElectionDto {
    private Long electionId;
    private String name;
    private LocalDateTime endDate;
    private Boolean isPrivate; // 추가 필드

    public ElectionDto(Long electionId, String name, LocalDateTime endDate, Boolean isPrivate) {
        this.electionId = electionId;
        this.name = name;
        this.endDate = endDate;
        this.isPrivate = isPrivate;
    }

    // Getters and Setters
    public Long getElectionId() {
        return electionId;
    }

    public void setElectionId(Long electionId) {
        this.electionId = electionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
    }
}
