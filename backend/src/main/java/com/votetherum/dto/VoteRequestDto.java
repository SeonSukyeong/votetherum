package com.votetherum.dto;

public class VoteRequestDto {
    private Long userId;

    // 생성자, getter, setter
    public VoteRequestDto() {}

    public VoteRequestDto(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
