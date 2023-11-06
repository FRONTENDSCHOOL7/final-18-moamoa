import React from 'react';

import styled from 'styled-components';
import Gobackbtn from './GoBackbtn';

export default function HeaderFollwerList() {
  return (
    <div>
      <HeaderFollwer>
        <Gobackbtn />
        <h1>Following</h1>
      </HeaderFollwer>
    </div>
  );
}
const HeaderFollwer = styled.div`
  display: flex;
  height: 48px;

  position: fixed;
  min-height: 48px;
  max-height: 48px;
  width: 390px;
  gap: 8px;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 16px;
  padding-left: 16px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;
