// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Election {
        string name;
        string[] candidates;
        uint endTime;
    }

    address public owner;
    uint public electionCount; // 선거의 고유 ID를 위한 카운터
    mapping(uint => Election) public elections; // 고유 ID로 선거 관리

    // 선거에 관련된 데이터는 외부 매핑으로 관리
    mapping(uint => mapping(address => bool)) public eligibleVoters; // 선거 ID로 접근
    mapping(uint => mapping(string => uint)) public votesReceived; // 선거 ID로 접근
    mapping(uint => mapping(address => bool)) public hasVoted; // 선거 ID로 접근

    constructor() {
        owner = msg.sender;
    }

    // 새로운 선거 추가 함수
    function createElection(string memory _name, string[] memory _candidates, uint _duration) public {
        require(msg.sender == owner, "Only the owner can create elections");
        require(_candidates.length > 0, "At least one candidate required");

        Election storage newElection = elections[electionCount];
        newElection.name = _name;
        newElection.candidates = _candidates;
        newElection.endTime = block.timestamp + _duration; // 선거 마감기한 설정

        electionCount++; // 새로운 선거를 만들 때마다 카운터 증가
    }

    // 특정 선거에 투표 자격 부여 함수
    function setVoterEligibility(uint electionId, address voter) public {
        require(msg.sender == owner, "Only the owner can set voter eligibility");
        eligibleVoters[electionId][voter] = true;
    }

    // 특정 선거에 투표 함수
    function vote(uint electionId, string memory candidateName) public {
        require(block.timestamp < elections[electionId].endTime, "Election has ended");
        require(eligibleVoters[electionId][msg.sender], "You are not eligible to vote");
        require(!hasVoted[electionId][msg.sender], "You have already voted");

        votesReceived[electionId][candidateName] += 1;
        hasVoted[electionId][msg.sender] = true;
    }

    // 특정 선거에서 후보자 득표수 확인 함수
    function totalVotesFor(uint electionId, string memory candidateName) public view returns (uint) {
        return votesReceived[electionId][candidateName];
    }

    // 특정 선거 정보 반환 함수
    function getElection(uint electionId) public view returns (string memory name, uint endTime) {
        Election storage election = elections[electionId];
        return (election.name, election.endTime);
    }
}
