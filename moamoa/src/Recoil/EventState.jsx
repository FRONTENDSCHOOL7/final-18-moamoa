import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const eventStateAtom = atom({
  key: 'eventStateAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default eventStateAtom;
