import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MoreImg from '../../Assets/icons/s-icon-more-vertical.svg';

export default function ChatModal() {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <Quitbtn onClick={openModal}>
        <img src={MoreImg} />
      </Quitbtn>
      {modal && (
        <BgCont>
          <Modal>
            <Deltext>채팅방을 나가시겠습니까?</Deltext>
            <Btn>
              <Link to='/chat' onClick={closeModal} className='Yes'>
                <BtnDel>확인</BtnDel>
              </Link>
              <BtnCancel onClick={closeModal} className='No'>
                취소
              </BtnCancel>
            </Btn>
          </Modal>
        </BgCont>
      )}
    </>
  );
}

const Quitbtn = styled.div`
  cursor: pointer;
  img {
    width: 24px;
  }
`;
const BgCont = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Modal = styled.div`
  width: 26rem;
  height: 14rem;
  background-color: #fff;
  border-radius: 1rem;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%);
  padding: 3rem 0 0;
  box-sizing: border-box;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
`;

const BtnCancel = styled.button`
  width: 12.5rem;
  height: 6.5rem;
  font-size: 1.4rem;
  &:hover {
    font-weight: bold;
    font-size: 1.45rem;
  }
`;

const BtnDel = styled(BtnCancel)`
  color: #eb5757;
  border-right: 1px solid #dbdbdb;
`;

const Deltext = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  padding-bottom: 3rem;
  border-bottom: 1px solid #dbdbdb;
`;
