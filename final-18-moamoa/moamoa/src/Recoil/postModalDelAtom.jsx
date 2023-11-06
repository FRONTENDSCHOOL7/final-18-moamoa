import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const postModalDelAtom = atom({
  key: 'postModalDelAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default postModalDelAtom;