import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const moreBtnPordAtom = atom({
  key: 'moreBtnPordAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default moreBtnPordAtom;