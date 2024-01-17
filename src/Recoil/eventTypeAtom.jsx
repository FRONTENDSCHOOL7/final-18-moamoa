import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const eventTypeAtom = atom({
  key: 'eventTypeAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default eventTypeAtom;
// 변수명 eventStateAtom을 eventTypeAtom으로 변경했습니다.
// 키 값 eventStateAtom을 eventTypeAtom으로 변경했습니다.
