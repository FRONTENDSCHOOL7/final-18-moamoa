import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userTokenAtom = atom({
  key: 'userTokenAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default userTokenAtom;
// 변수명 userToken을 userTokenAtom으로 변경했습니다.
// 키 값 userTokenKey를 userTokenAtom으로 변경했습니다.
