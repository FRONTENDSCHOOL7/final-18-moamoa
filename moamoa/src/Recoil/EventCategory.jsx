import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isFestival = atom({
  key: 'isFestival',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const isExperience = atom({
  key: 'isExperience',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { isFestival, isExperience };
