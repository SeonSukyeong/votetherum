// 일반 로그인용
package com.votetherum.dto;

public class LoginRequestDto {
    private String username;
    private String password;

    // 생성자, getter, setter

    // 기본 생성자
    public LoginRequestDto() {}

    // 생성자
    public LoginRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getter와 Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}