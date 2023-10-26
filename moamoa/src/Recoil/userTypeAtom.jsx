import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const userTypeAtom = atom({
  key: 'userTypeAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default userTypeAtom;
// 기존의 변수명 joinStateAtom을 userTypeAtom으로 변경. key값도 함께 변경했습니다.
