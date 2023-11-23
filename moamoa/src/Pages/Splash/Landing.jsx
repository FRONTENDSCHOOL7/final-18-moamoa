import React from 'react';
import styled from 'styled-components';
import LoginModal from '../../Components/Splash/LoginModal';
import SplashLogo from '../../Components/Splash/SplashLogo';

export default function Landing() {
  return (
    <MoaMoaBox>
      <SplashLogo />
      <LoginModal />
      <Copyright>@copyright moamoa corp</Copyright>
    </MoaMoaBox>
  );
}

const MoaMoaBox = styled.div`
  background-color: #2e2c39;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 390px;
  height: 100vh;
  margin: 0 auto;
  p {
    padding-top: 10px;
    color: #ffffff;
    font-size: 18px;
  }
  overflow: hidden;
  position: relative;
`;
const Copyright = styled.p`
  margin-top: 370px;
  color: #ffffff;
  font-size: 14px;
`;
