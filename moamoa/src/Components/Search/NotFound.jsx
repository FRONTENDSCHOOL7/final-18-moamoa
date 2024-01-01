import React from 'react';
import iconSearchNotFound from '../../Assets/icons/icon-searchNotFound.svg';
import { NotFoundContainer } from './SearchStyle';
export default function NotFound() {
  return (
    <NotFoundContainer>
      <img src={iconSearchNotFound} alt='' />
      <p>검색 결과가 없습니다.</p>
    </NotFoundContainer>
  );
}
