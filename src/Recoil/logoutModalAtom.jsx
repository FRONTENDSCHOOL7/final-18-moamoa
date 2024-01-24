import { atom } from 'recoil';

export const showMyProfileOptionsState = atom({
  key: 'showMyProfileOptionsState',
  default: false,
});

export const showConfirmLogoutModalState = atom({
  key: 'showConfirmLogoutModalState',
  default: false,
});
