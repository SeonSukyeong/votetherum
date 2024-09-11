//0820 추가
package com.votetherum.dto;

import java.time.LocalDateTime;

public class ElectionSearchResultDto {
    private Long id;
    private String name;
    private LocalDateTime endDate;
    private String status;

    public ElectionSearchResultDto(Long id, String name, LocalDateTime endDate, String status) {
        this.id = id;
        this.name = name;
        this.endDate = endDate;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
