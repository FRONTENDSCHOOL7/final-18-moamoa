import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const detailPostAtom = atom({
  key: 'detailPostAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default detailPostAtom;
