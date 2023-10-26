import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const followPostAtom = atom({
  key: 'followPostAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default followPostAtom;
// 변수명 PostState을 followPostAtom으로 변경했습니다.
// 키 값 postState를 followPostAtom으로 변경했습니다.
