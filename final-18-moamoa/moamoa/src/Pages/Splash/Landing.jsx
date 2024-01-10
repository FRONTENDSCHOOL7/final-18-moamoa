import React from 'react';
import LoginModal from '../../Components/Splash/LoginModal';
import SplashLogo from '../../Components/Splash/SplashLogo';
import { MoaMoaBox, Copyright } from './SplashStyle';

export default function Landing() {
  return (
    <MoaMoaBox>
      <SplashLogo />
      <LoginModal />
      <Copyright>@copyright moamoa corp</Copyright>
    </MoaMoaBox>
  );
}
