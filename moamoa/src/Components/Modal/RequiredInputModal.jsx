import React from 'react';
import styled from 'styled-components';
import MoaYellow from '../../Assets/icons/character-yellow.png';

export default function RequiredInputModal() {
  return (
    <>
      {
        <BackGround>
          <Cont image={MoaYellow}>
            <NoticeText role='alert'>입력하지 않은 정보가 있습니다.</NoticeText>
          </Cont>
        </BackGround>
      }
    </>
  );
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const Cont = styled.div`
  width: 26rem;
  height: 5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 50%;
  top: 20%;
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
    content: '';
    width: 3.8rem;
    height: 3.9rem;
    display: block;
    background-image: ${(props) => `url(${props.image})`};
    background-size: 3.8rem 3.9rem;
  }
`;

const NoticeText = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;
