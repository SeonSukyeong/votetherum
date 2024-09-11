package com.votetherum.service;

import com.votetherum.dto.UpdateProfileRequestDto;
import com.votetherum.dto.UpdateSocialProfileRequestDto;
import com.votetherum.entity.User;
import com.votetherum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ProfileService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 일반 사용자 프로필 수정
    public User updateProfile(Long userId, UpdateProfileRequestDto requestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setNickname(requestDto.getNickname());

        // 비밀번호 수정
        if (requestDto.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
            user.setPassword(encodedPassword);
        }

        return userRepository.save(user);
    }

    // 소셜 로그인 사용자 프로필 수정
    public User updateSocialProfile(Long userId, UpdateSocialProfileRequestDto requestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setNickname(requestDto.getNickname());

        return userRepository.save(user);
    }

    // 프로필 사진 등록/수정
    public User updateProfilePhoto(Long userId, String photoUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setProfilePhoto(photoUrl);
        return userRepository.save(user);
    }

    // 프로필 사진 삭제
    public User deleteProfilePhoto(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setProfilePhoto(null);
        return userRepository.save(user);
    }

    // 프로필 사진 조회
    public String getProfilePhoto(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return user.getProfilePhoto();
    }
}
