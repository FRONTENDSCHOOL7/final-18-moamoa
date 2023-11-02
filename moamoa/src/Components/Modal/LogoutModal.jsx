import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function LogoutModal({ closeModal, openConfirmLogoutModal }) {
  const navigate = useNavigate();

  return (
    <ModalCont>
      <section>
        <Modal>
          <BtnClose onClick={closeModal}>
            <span></span>
          </BtnClose>
          <BtnWrap>
            <BtnInfo
              type='button'
              onClick={() => {
                navigate(`/profile/myInfo`);
                closeModal();
              }}
            >
              설정 및 개인정보
            </BtnInfo>
            <BtnLogout type='button' onClick={openConfirmLogoutModal}>
              로그아웃
            </BtnLogout>
          </BtnWrap>
        </Modal>
      </section>
    </ModalCont>
  );
}

LogoutModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openConfirmLogoutModal: PropTypes.func.isRequired,
};

// 모달 디자인
const ModalCont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Modal = styled.div`
  width: 39rem;
  height: 20.7rem;
  margin: auto;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  background-color: white;
  z-index: 10;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const BtnWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: start;
  margin: 0 26px;
  font-size: 14px;
`;

const BtnClose = styled.button`
  padding: 16px 0;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  span {
    display: inline-block; // inline-block으로 설정해야 width와 height가 적용
    width: 50px;
    height: 4px;
    background-color: #dbdbdb;
    border-radius: 5px;
  }
`;

const BtnInfo = styled.button`
  width: 100%;
  height: 100%;
  &:hover {
    font-weight: bold;
    color: #ffc700;
  }
`;

const BtnLogout = styled.button`
  width: 100%;
  height: 100%;
  &:hover {
    font-weight: bold;
    color: #ffc700;
  }
`;
