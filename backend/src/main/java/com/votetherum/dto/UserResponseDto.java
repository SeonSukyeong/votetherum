package com.votetherum.dto;

import com.votetherum.entity.User;

public class UserResponseDto {

    private Long id;           // 사용자 ID
    private String username;   // 사용자 이름
    private String email;      // 사용자 이메일
    private String profilePhoto; // 프로필 사진 URL

    // 기본 생성자
    public UserResponseDto() {}

    // 매개변수가 있는 생성자
    public UserResponseDto(Long id, String username, String email, String profilePhoto) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profilePhoto = profilePhoto;
    }

    // User 객체를 매개변수로 받는 생성자
    public UserResponseDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profilePhoto = user.getProfilePhoto(); // 수정된 부분
    }

    // Getter 및 Setter 메서드
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePhoto() { // 수정된 부분
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) { // 수정된 부분
        this.profilePhoto = profilePhoto;
    }

    @Override
    public String toString() {
        return "UserResponseDto{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", profilePhoto='" + profilePhoto + '\'' +
                '}';
    }
}