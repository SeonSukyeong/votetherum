package com.votetherum.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    private String nickname;

    @Column(name = "social_id", unique = true)
    private String socialId;

    @Column(name = "profile_photo")
    private String profilePhoto; // 프로필 사진 URL 추가

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // 기본 생성자
    public User() {}

    // 생성자 (일반 회원가입용)
    public User(String username, String nickname, String password, String email) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.socialId = null; // 일반 회원가입은 socialId가 없음
    }

    // 생성자 (소셜 로그인용)
    public User(String socialId, String nickname, String email) {
        this.socialId = socialId;
        this.nickname = nickname;
        this.email = email;
        this.username = null; // 소셜 로그인은 username이 필요 없음
        this.password = null; // 소셜 로그인은 password가 필요 없음
    }

    // 새로운 생성자 추가 (username, nickname, password, email, socialId)
    public User(String username, String nickname, String password, String email, String socialId) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.socialId = socialId;
    }

    // Getter 및 Setter 메소드
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

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getSocialId() {
        return socialId;
    }

    public void setSocialId(String socialId) {
        this.socialId = socialId;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
