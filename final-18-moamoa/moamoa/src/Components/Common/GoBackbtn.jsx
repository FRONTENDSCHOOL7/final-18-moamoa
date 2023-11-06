import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconGoBack from '../../Assets/icons/icon-arrow-left.svg';
import styled from 'styled-components';

const GoBackImage = styled.img`
  cursor: pointer;
`;
export default function Gobackbtn() {
  const navigate = useNavigate();
  // console.log(navigate);
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <a onClick={handleGoBack}>
        <GoBackImage src={iconGoBack} />
      </a>
    </div>
  );
}
