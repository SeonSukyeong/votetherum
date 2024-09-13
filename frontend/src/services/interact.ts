import Web3 from 'web3';
import VotingContract from '../../build/contracts/Voting.json'; // Voting 계약 ABI
import { NGROK_URL } from '@env';  // 환경변수에서 NGROK_URL 가져오기

const web3 = new Web3(Web3.givenProvider || `https://${NGROK_URL}`); // MetaMask 제공자 또는 로컬 이더리움 노드

const contractAddress = '0xAbF128e05Ddb5f29B53E472c8D2be36aF31672AE'; // 배포된 스마트 컨트랙트 주소
const voting = new web3.eth.Contract(VotingContract.abi, contractAddress);

// 선거 생성
export const createElection = async (name: string, candidates: string[], duration: number) => {
  const accounts = await web3.eth.getAccounts();
  const result = await voting.methods
    .createElection(name, candidates, duration)
    .send({ from: accounts[0] });

  return result; // 결과 반환
};

// 투표 자격 부여
export const setVoterEligibility = async (electionId: number, voterAddress: string) => {
  const accounts = await web3.eth.getAccounts();
  const result = await voting.methods
    .setVoterEligibility(electionId, voterAddress)
    .send({ from: accounts[0] });

  return result; // 결과 반환
};

// 투표
export const vote = async (electionId: number, candidateName: string) => {
  const accounts = await web3.eth.getAccounts();
  const result = await voting.methods
    .vote(electionId, candidateName)
    .send({ from: accounts[0] });

  return result; // 결과 반환
};

// 선거 정보 조회
export const getElection = async (electionId: number): Promise<{ name: string, endTime: number }> => {
  const election = await voting.methods
    .getElection(electionId)
    .call() as [string, number];

  return {
    name: election[0],
    endTime: election[1]
  };
};

// 유권자 자격 확인
export const checkVoterEligibility = async (electionId: number, voterAddress: string) => {
  const result = await voting.methods
    .checkVoterEligibility(electionId, voterAddress)
    .call(); // .call()은 상태를 변경하지 않고 조회만 할 때 사용합니다.

  return result; // true 또는 false 반환
};

// 생성된 선거 목록 조회
export const getCreatedElections = async (): Promise<{ id: number, name: string, endTime: number }[]> => {
  const electionCount = await voting.methods.getElectionCount().call() as number; // 총 선거 개수 조회
  const elections = [];

  for (let i = 0; i < electionCount; i++) {
    const election = await getElection(i); // 각 선거 정보를 getElection으로 조회
    elections.push({
      id: i,
      name: election.name,
      endTime: election.endTime
    });
  }

  return elections;
};

// candidates 조회 함수 추가
export const getCandidatesForElection = async (electionId: number): Promise<string[]> => {
  try {
    // getCandidates는 스마트 계약에서 정의한 후보자 목록 조회 함수입니다.
    const candidates: string[] = await voting.methods
      .getCandidates(electionId)
      .call();

    return candidates; // 문자열 배열 반환
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};