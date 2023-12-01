import React from 'react';
import styled from 'styled-components';
import iconSearchNotFound from '../../Assets/icons/icon-searchNotFound.svg';
export default function NotFound() {
  return (
    <NotFoundContainer>
      <img src={iconSearchNotFound} alt='' />
      <p>검색 결과가 없습니다.</p>
    </NotFoundContainer>
  );
}
const NotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    margin-block: 60px 20px;
    transform: translateX(-5%);
  }
  p {
    font-size: 20px;
    transform: translateX(5%);
    color: #919191;
  }
`;
