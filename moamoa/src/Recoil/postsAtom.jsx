import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const postsAtom = atom({
  key: 'postsAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default postsAtom;
