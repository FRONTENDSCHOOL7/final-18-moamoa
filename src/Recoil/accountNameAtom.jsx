import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const accountNameAtom = atom({
  key: 'accountNameAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default accountNameAtom;
