//소셜 로그인 프로필 수정용
package com.votetherum.dto;

public class UpdateSocialProfileRequestDto {
    private String nickname;

    // 생성자, getter, setter
    public UpdateSocialProfileRequestDto() {}

    public UpdateSocialProfileRequestDto(String nickname) {
        this.nickname = nickname;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
