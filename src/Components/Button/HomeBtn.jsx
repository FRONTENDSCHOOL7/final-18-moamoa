import React from 'react';
import MOAMOA from '../../Assets/images/MOAMOA.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export default function HomeBtn() {
  return (
    <Link to='/home'>
      <HomeButton src={MOAMOA} alt='홈으로 이동' style={{width:"13rem",height:"2.5rem"}}/>
    </Link>
  );
}
const HomeButton = styled.img`
  margin-top: 0.3rem;
`;