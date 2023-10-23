import React from 'react';
import styled from 'styled-components';
// import Logo from '../assets/images/Logo.png';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const MoaMoaBox = styled.div`
  background-color: #2e2c39;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 390px;
  gap: 20px;
  margin: 0 auto;
  img {
    margin-top: 200px;
    width: 211.878px;
    height: 125.24px;
  }
`;

const Copyright = styled.p`
  margin-top: 300px;
  color: red;
`;

export default function Landings() {
  return (
    <Container>
      <MoaMoaBox>
        {/* <img src={Logo} alt='' /> */}
        <Copyright>@copyright moamoa corp</Copyright>
      </MoaMoaBox>
    </Container>
  );
}
