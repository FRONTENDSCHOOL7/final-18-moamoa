import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const postModalOpenAtom = atom({
  key: 'postModalOpenAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default postModalOpenAtom;