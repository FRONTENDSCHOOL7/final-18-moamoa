import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const joinStateAtom = atom({
  key: 'joinStateAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default joinStateAtom;
