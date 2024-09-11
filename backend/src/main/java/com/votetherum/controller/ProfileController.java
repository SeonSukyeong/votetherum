package com.votetherum.controller;

import com.votetherum.dto.UpdateProfilePhotoRequestDto;
import com.votetherum.dto.UpdateProfileRequestDto;
import com.votetherum.dto.UpdateSocialProfileRequestDto;
import com.votetherum.dto.UserResponseDto;
import com.votetherum.entity.User;
import com.votetherum.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // 일반 사용자 프로필 수정
    @PatchMapping("/update/{userId}")
    public ResponseEntity<UserResponseDto> updateProfile(
            @PathVariable Long userId,
            @RequestBody UpdateProfileRequestDto requestDto) {

        User updatedUser = profileService.updateProfile(userId, requestDto);
        UserResponseDto responseDto = new UserResponseDto(updatedUser);
        return ResponseEntity.ok(responseDto);
    }

    // 소셜 로그인 사용자 프로필 수정
    @PatchMapping("/update-social/{userId}")
    public ResponseEntity<UserResponseDto> updateSocialProfile(
            @PathVariable Long userId,
            @RequestBody UpdateSocialProfileRequestDto requestDto) {

        User updatedUser = profileService.updateSocialProfile(userId, requestDto);
        UserResponseDto responseDto = new UserResponseDto(updatedUser);
        return ResponseEntity.ok(responseDto);
    }

    // 프로필 사진 등록/수정
    @PostMapping("/update-photo/{userId}")
    public ResponseEntity<UserResponseDto> updateProfilePhoto(
            @PathVariable Long userId,
            @RequestBody UpdateProfilePhotoRequestDto requestDto) {

        User updatedUser = profileService.updateProfilePhoto(userId, requestDto.getPhotoUrl());
        UserResponseDto responseDto = new UserResponseDto(updatedUser);
        return ResponseEntity.ok(responseDto);
    }

    // 프로필 사진 삭제
    @DeleteMapping("/delete-photo/{userId}")
    public ResponseEntity<UserResponseDto> deleteProfilePhoto(@PathVariable Long userId) {
        User updatedUser = profileService.deleteProfilePhoto(userId);
        UserResponseDto responseDto = new UserResponseDto(updatedUser);
        return ResponseEntity.ok(responseDto);
    }

    // 프로필 사진 조회
    @GetMapping("/photo/{userId}")
    public ResponseEntity<String> getProfilePhoto(@PathVariable Long userId) {
        String photoUrl = profileService.getProfilePhoto(userId);
        return ResponseEntity.ok(photoUrl);
    }
}
