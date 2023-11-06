import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '../../Assets/icons/x.png';

export default function LogoutModal({ closeModal, openConfirmLogoutModal }) {
  const navigate = useNavigate();

  return (
    <ModalCont>
        <Modal>
          <BtnClose onClick={closeModal}>
            <img src={CloseIcon} alt='닫기' />
          </BtnClose>
            <BtnLogout type='button' onClick={openConfirmLogoutModal}>
              로그아웃
            </BtnLogout>
            <BtnInfo type='button' onClick={() => {
                navigate(`/profile/myInfo`);
                closeModal();
              }}>설정 및 개인정보
            </BtnInfo>
        </Modal>
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
  height: 13.8rem;
  margin: auto;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  background-color: white;
  z-index: 10;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: normal;
`;

const BtnClose = styled.button`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 0;
`;

const BtnInfo = styled.button`
  width: 39rem;
  padding: 2rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: #4f9ee9;
  &:hover {
    font-weight: bold;
  }
`;

const BtnLogout = styled(BtnInfo)`
  margin-top: 1.2rem;
  border-bottom: 1px solid #dbdbdb;
  color: #eb5757;
`;
