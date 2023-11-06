import React from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'

export default function MoreBtn() {

  return (
    <>
      <PostMoreBtn><MoreImg src={more} alt="더보기" /></PostMoreBtn>
    </>
  )

  
}

const PostMoreBtn = styled.button`
  width: 6rem;
  height: 1.8rem;
  cursor: pointer;
  position: relative;
` ;
const MoreImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  right: 0;
  top: 0;
`;
