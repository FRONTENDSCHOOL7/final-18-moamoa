import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function LogoutModal({ logout, closeModal }) {
  return (
    <ModalCont>
      <ConfirmModal>
          <Deltext>로그아웃하시겠어요?</Deltext>
          <Btn>
            <BtnLogout onClick={logout}>로그아웃</BtnLogout>
            <BtnCancel onClick={closeModal}>취소</BtnCancel>
          </Btn>
      </ConfirmModal>
    </ModalCont>
  );
}

LogoutModal.propTypes = {
  logout: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ModalCont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

// 로그아웃 확인 모달
const ConfirmModal = styled.div`
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
  font-weight: normal;
`;

const BtnCancel = styled.button`
  width: 12.5rem;
  height: 6.5rem;
  font-size: 1.4rem;
  &:hover {
    font-weight: bold;
  }
`;

const BtnLogout = styled(BtnCancel)`
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
