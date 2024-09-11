// 일반 회원가입용
package com.votetherum.dto;

public class SignupRequestDto {
    private String username; // 사용자 아이디
    private String nickname;
    private String password;
    private String email;

    // 생성자, getter, setter

    // 기본 생성자
    public SignupRequestDto() {}

    // 생성자
    public SignupRequestDto(String username, String nickname, String password, String email) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }

    // Getter와 Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}