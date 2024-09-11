package com.votetherum.controller;

import com.votetherum.dto.SignupRequestDto;
import com.votetherum.dto.LoginRequestDto;
import com.votetherum.dto.NaverLoginRequestDto;
import com.votetherum.dto.KakaoLoginRequestDto;
import com.votetherum.entity.User;
import com.votetherum.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // 일반 회원가입
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody SignupRequestDto requestDto) {
        authService.registerUser(requestDto);
        Map<String, Object> response = new HashMap<>();
        response.put("username", requestDto.getUsername());
        response.put("nickname", requestDto.getNickname());
        response.put("email", requestDto.getEmail());
        return ResponseEntity.ok(response);
    }

    // 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequestDto requestDto) {
        User user = authService.loginUser(requestDto);
        Map<String, Object> response = new HashMap<>();
        response.put("username", user.getUsername());
        response.put("nickname", user.getNickname());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

    // 네이버 소셜 로그인
    @PostMapping("/social-login/naver")
    public ResponseEntity<Map<String, Object>> naverLogin(@RequestBody NaverLoginRequestDto requestDto) {
        User user = authService.naverLogin(requestDto);
        Map<String, Object> response = new HashMap<>();
        response.put("socialId", user.getSocialId());
        response.put("nickname", user.getNickname());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

    // 카카오 소셜 로그인
    @PostMapping("/social-login/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestBody KakaoLoginRequestDto requestDto) {
        User user = authService.kakaoLogin(requestDto);
        Map<String, Object> response = new HashMap<>();
        response.put("socialId", user.getSocialId());
        response.put("nickname", user.getNickname());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }
}
//통합된 엔드포인트: POST 메서드를 통해 각각의 로그인 및 회원가입 요청을 처리하도록 설정했습니다.
//Response 형식: 성공적으로 로그인 또는 회원가입 시, 사용자 정보를 반환합니다.
