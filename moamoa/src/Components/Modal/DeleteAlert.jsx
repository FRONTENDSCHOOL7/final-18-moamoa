import React from 'react'
import styled from 'styled-components'
import MoaYellow from '../../Assets/icons/character-yellow.png'

export default function DeleteAlert() {
  return (
    <Cont>
      <NoticeText>삭제가 완료되었습니다!</NoticeText>
    </Cont>
  )
}


const Cont = styled.div`
  width: 26rem;
  height: 5rem;
  background: #FFF;
  border-radius: 1rem;
  box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 50%;
  top: 10%;
  transform: translate(-50%);
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: fadein 0.3s;
  @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
  &::before {
    content: "";
    width: 3.8rem;
    height: 3.9rem;
    display: block;
    background: url(${MoaYellow});
    background-size: 3.8rem 3.9rem;
  }
`;

const NoticeText = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;