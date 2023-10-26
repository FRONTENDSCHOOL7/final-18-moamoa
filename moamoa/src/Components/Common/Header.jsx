import React from 'react';
import Gobackbtn from './Button/Gobackbtn';
import styled from 'styled-components';
const Container = styled.div`
  height: 120vh;
`;
const HeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  box-shadow: inset 0 0 20px red;
  background-color: #fff;
  position: fixed;
  border-bottom: 1px solid #dbdbdb;
  line-height: px;
`;

export default function Header() {
  return (
    <Container>
      <HeaderContainer>
        <Gobackbtn />
      </HeaderContainer>
    </Container>
  );
}
