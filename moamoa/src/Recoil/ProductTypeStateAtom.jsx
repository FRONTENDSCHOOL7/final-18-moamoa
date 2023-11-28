import { atom } from 'recoil';

export const festivalActiveState = atom({
  key: 'festivalActiveState',
  default: true,
});

export const experienceActiveState = atom({
  key: 'experienceActiveState',
  default: false,
});
