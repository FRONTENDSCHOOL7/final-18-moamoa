/*
  설명: 사용자 userName을 저장하는 Atom
  작성자: 이해지
  최초 작성 날짜: 2023.10.30
  마지막 수정 날까: 2023.10.30
*/

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userNameAtom = atom({
  key: 'userNameAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default userNameAtom;
