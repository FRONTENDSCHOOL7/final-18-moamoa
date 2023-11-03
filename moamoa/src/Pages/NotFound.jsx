import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorImg from '../Assets/icons/404.svg';
import styled from 'styled-components';
import { Container } from '../Components/Common/Container';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <ErrorContainer>
      <img src={ErrorImg} alt='404 로고' />
      <ErrorMsg>페이지를 찾을 수 없습니다 :&#41;</ErrorMsg>
      <ErrorInfoButton onClick={handleGoBack}>이전 페이지</ErrorInfoButton>
    </ErrorContainer>
  );
}

const ErrorMsg = styled.p`
  color: #767676;
  font-size: 1.7rem;
  font-weight: 600;
  margin-top: 30px;
`;

const ErrorContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const ErrorInfoButton = styled.button`
  width: 120px;
  height: 40px;
  color: #fff;
  border-radius: 44px;
  background-color: #87b7e4;
  font-weight: 700;
  margin-top: 20px;
  font-size: 1.5rem;
`;
