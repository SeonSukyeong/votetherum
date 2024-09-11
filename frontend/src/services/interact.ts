import Web3 from 'web3';
import VotingContract from '../../build/contracts/Voting.json'; // Voting 계약 ABI

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // MetaMask 제공자 또는 로컬 이더리움 노드

const contractAddress = '0xC62F0a8ef47716C9A785f619dc9A6601Ed2940b1'; // 배포된 스마트 컨트랙트 주소
const voting = new web3.eth.Contract(VotingContract.abi, contractAddress);

// 선거 생성
export const createElection = async (name: string, candidates: string[], duration: number) => {
  const accounts = await web3.eth.getAccounts();
  await voting.methods.createElection(name, candidates, duration).send({ from: accounts[0] });
};

// 투표 자격 부여
export const setVoterEligibility = async (electionId: number, voterAddress: string) => {
  const accounts = await web3.eth.getAccounts();
  await voting.methods.setVoterEligibility(electionId, voterAddress).send({ from: accounts[0] });
};

// 투표
export const vote = async (electionId: number, candidateName: string) => {
  const accounts = await web3.eth.getAccounts();
  await voting.methods.vote(electionId, candidateName).send({ from: accounts[0] });
};

// 선거 정보 조회
export const getElection = async (electionId: number): Promise<{ name: string, endTime: number }> => {
    const election = await voting.methods.getElection(electionId).call() as [string, number];
    return {
      name: election[0],
      endTime: election[1]
    };
  };
