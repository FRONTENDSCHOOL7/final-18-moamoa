import React from 'react';
import LoginModal from '../../Components/Splash/LoginModal';
import SplashLogo from '../../Components/Splash/SplashLogo';
import { MoaMoaBox, Copyright } from './SplashStyle';
import { modalActiveState } from '../../Recoil/modalActiveState ';
import { useRecoilValue } from 'recoil';

export default function Landing() {
  const modalActive = useRecoilValue(modalActiveState);

  return (
    <MoaMoaBox>
      <SplashLogo />
      <LoginModal />
      <Copyright visible={modalActive}>@copyright moamoa corp</Copyright>
    </MoaMoaBox>
  );
}
