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
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 120px;
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    transform: translateX(5%);
    color: #919191;
  }
`;
