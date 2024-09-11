-- 사용자 테이블
CREATE TABLE User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255),
    nickname VARCHAR(255),
    social_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 투표 테이블
CREATE TABLE Election (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_private BOOLEAN DEFAULT FALSE
);

-- 후보자 테이블 (응원수 포함)
CREATE TABLE Candidate (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    election_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    support_count INT DEFAULT 0,
    FOREIGN KEY (election_id) REFERENCES Election(id)
);

-- 투표 기록 테이블
CREATE TABLE Vote (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    election_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    candidate_id BIGINT NOT NULL,
    wallet_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (election_id) REFERENCES Election(id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (candidate_id) REFERENCES Candidate(id)
);
