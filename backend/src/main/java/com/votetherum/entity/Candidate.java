package com.votetherum.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Candidate")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "election_id", nullable = false)
    private Election election;

    @Column(nullable = false)
    private String name;

    @Lob
    private String description;

    @Column(name = "support_count")
    private Integer supportCount = 0;

    // 기본 생성자
    public Candidate() {}

    // 매개변수가 있는 생성자
    public Candidate(Election election, String name, String description, Integer supportCount) {
        this.election = election;
        this.name = name;
        this.description = description;
        this.supportCount = supportCount;
    }

    // Getter 및 Setter 메소드
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Election getElection() {
        return election;
    }

    public void setElection(Election election) {
        this.election = election;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSupportCount() {
        return supportCount;
    }

    public void setSupportCount(Integer supportCount) {
        this.supportCount = supportCount;
    }
}
