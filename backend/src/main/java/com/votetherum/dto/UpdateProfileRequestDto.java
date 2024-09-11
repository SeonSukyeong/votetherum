//일반 로그인 프로필 수정용
package com.votetherum.dto;

public class UpdateProfileRequestDto {
    private String nickname;
    private String password; // 소셜 로그인 사용자는 비밀번호를 null로 전달할 수 있습니다.

    // 생성자, getter, setter
    public UpdateProfileRequestDto() {}

    public UpdateProfileRequestDto(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
