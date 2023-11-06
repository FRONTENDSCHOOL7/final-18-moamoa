import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const moreBtnPostAtom = atom({
  key: 'moreBtnPostAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default moreBtnPostAtom;