package com.votetherum.service;

import com.votetherum.dto.SignupRequestDto;
import com.votetherum.dto.LoginRequestDto;
import com.votetherum.dto.NaverLoginRequestDto;
import com.votetherum.dto.KakaoLoginRequestDto;
import com.votetherum.repository.UserRepository;
import com.votetherum.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 일반 회원가입
    public void registerUser(SignupRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
        User user = new User(
            requestDto.getUsername(),
            requestDto.getNickname(),
            encodedPassword,
            requestDto.getEmail(),
            null // 소셜 ID는 null로 설정
        );
        userRepository.save(user);
    }

    // 일반 로그인
    public User loginUser(LoginRequestDto requestDto) {
        User user = userRepository.findByUsername(requestDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다."));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        return user;
    }

    // 네이버 소셜 로그인
    public User naverLogin(NaverLoginRequestDto requestDto) {
        Optional<User> optionalUser = userRepository.findBySocialId(requestDto.getSocialId());

        if (optionalUser.isEmpty()) {
            // 새로운 사용자 생성
            User newUser = new User(
                requestDto.getSocialId(),
                requestDto.getNickname(),
                null, // 비밀번호는 소셜 로그인 시 사용되지 않음
                requestDto.getEmail(),
                requestDto.getSocialId()
            );
            return userRepository.save(newUser);
        }

        return optionalUser.get();
    }

    // 카카오 소셜 로그인
    public User kakaoLogin(KakaoLoginRequestDto requestDto) {
        Optional<User> optionalUser = userRepository.findBySocialId(requestDto.getSocialId());

        if (optionalUser.isEmpty()) {
            // 새로운 사용자 생성
            User newUser = new User(
                requestDto.getSocialId(),
                requestDto.getNickname(),
                null, // 비밀번호는 소셜 로그인 시 사용되지 않음
                requestDto.getEmail(),
                requestDto.getSocialId()
            );
            return userRepository.save(newUser);
        }

        return optionalUser.get();
    }
}

//통합 포인트: 기존 UserRepository를 사용하여 사용자를 저장하고 조회하는 로직을 구현했습니다.
//비밀번호 암호화: PasswordEncoder를 활용하여 비밀번호를 안전하게 저장합니다.