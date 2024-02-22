import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import iconGoBack from '../../Assets/icons/icon-arrow-left.svg';
import styled from 'styled-components';

const GoBackImage = styled.img`
  cursor: pointer;
`;
const A11yHidden = styled.p`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;
export default function Gobackbtn() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Link onClick={handleGoBack}>
      <GoBackImage src={iconGoBack} alt='뒤로가기' style={{ width: '2.2rem', height: '2.2rem' }} />
      <A11yHidden>뒤로 가기</A11yHidden>
    </Link>
  );
}
