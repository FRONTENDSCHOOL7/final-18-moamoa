import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userToken = atom({
  key: 'userTokenKey',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default userToken;
