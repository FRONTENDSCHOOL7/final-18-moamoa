import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const PostState = atom({
  key:"postState",
  default:[],
  effects_UNSTABLE: [persistAtom],
});

export default PostState;