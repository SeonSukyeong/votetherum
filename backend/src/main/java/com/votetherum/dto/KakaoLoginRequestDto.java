// 카카오 소셜 로그인용
package com.votetherum.dto;

public class KakaoLoginRequestDto {
    private String socialId;  // 카카오에서 제공하는 고유 ID
    private String nickname;
    private String email;

    // 생성자, getter, setter

    // 기본 생성자
    public KakaoLoginRequestDto() {}

    // 생성자
    public KakaoLoginRequestDto(String socialId, String nickname, String email) {
        this.socialId = socialId;
        this.nickname = nickname;
        this.email = email;
    }

    // Getter와 Setter
    public String getSocialId() {
        return socialId;
    }

    public void setSocialId(String socialId) {
        this.socialId = socialId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}