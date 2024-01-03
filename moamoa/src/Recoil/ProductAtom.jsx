import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export const ProductAtom = atom({
  key: 'ProductState',
  default: [],
  effects_UNSTABLE: [recoilPersist()],
});
