import { createElection, setVoterEligibility } from '../../services/interact'; // 경로에 맞게 설정 

const createMultipleElectionsWithVoterEligibility = async () => {
    try {
      // 여러 선거 데이터
      const elections = [
        { name: '학교 회장 선거', candidates: ['홍길동', '임꺽정'], duration: 86400, voterAddresses: ['0xb5ab9228cd3f15261f25e43999cF423451407468', '0x423a22DfAF4681B53Ede4Bf34937394bCAa7ea33'] },
        { name: '반장 선거', candidates: ['김철수', '이영희'], duration: 43200, voterAddresses: ['0xb5ab9228cd3f15261f25e43999cF423451407468', '0xD29223D52577489Eb5071e383ff52d008e6d8e2D'] },
        { name: '동아리 회장 선거', candidates: ['박민수', '최정현'], duration: 604800, voterAddresses: ['0xb5ab9228cd3f15261f25e43999cF423451407468', '0xCeaFf93Ae4bF104446A4E3CC192Aea917De01b7d'] }
      ];
  
      // 여러 선거 생성 및 유권자 자격 부여
      for (const election of elections) {
        // 선거 생성
        const result = await createElection(election.name, election.candidates, election.duration);
  
        // 이벤트가 있는지 확인
        if (result && result.events && result.events.ElectionCreated) {
          // event의 returnValues가 항상 정의된다고 보장할 수 없기 때문에 타입 단언을 사용합니다.
          const electionIdStr = result.events.ElectionCreated.returnValues.electionId as string;
          const electionId = parseInt(electionIdStr, 10); // 선거 ID를 정수로 변환
  
          console.log(`${election.name} 선거가 성공적으로 생성되었습니다. (ID: ${electionId})`);
  
          // 각 선거에 대해 유권자 자격 부여
          for (const address of election.voterAddresses) {
            await setVoterEligibility(electionId, address); // 실제 선거 ID 사용
            console.log(`${address}에 유권자 자격이 부여되었습니다.`);
          }
        } else {
          console.error('선거 생성 이벤트를 찾을 수 없습니다.');
        }
      }
    } catch (error) {
      console.error('여러 선거 생성 또는 유권자 자격 부여 중 오류:', error);
    }
  };
  
  createMultipleElectionsWithVoterEligibility();