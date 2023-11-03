import React from 'react';

import styled from 'styled-components';
import Gobackbtn from './GoBackbtn';

export default function HeaderFollowerList() {
  return (
    <div>
      <HeaderFollower>
        <Gobackbtn />
        <h1>Followers</h1>
      </HeaderFollower>
    </div>
  );
}
const HeaderFollower = styled.div`
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
