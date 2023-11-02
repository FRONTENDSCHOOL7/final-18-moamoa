import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ConfirmLogoutModal({ logout, closeModal }) {
  return (
    <ModalCont>
      <ConfirmModal>
        <ConfirmWrap>
          <p>로그아웃하시겠어요?</p>
          <ConfirmBtns>
            <button onClick={closeModal}>취소</button>
            <button onClick={logout}>로그아웃</button>
          </ConfirmBtns>
        </ConfirmWrap>
      </ConfirmModal>
    </ModalCont>
  );
}

ConfirmLogoutModal.propTypes = {
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
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ConfirmWrap = styled.div`
  width: 26rem;
  height: 10rem;
  background-color: #fff;
  border-radius: 1rem;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%);

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  p {
    padding: 2rem 0 2rem;
    font-size: 16px;
  }
`;

const ConfirmBtns = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  button {
    font-size: 14px;
    height: 100%;
    width: 100%;
    transition: font-weight 0.3s ease; // 부드러운 전환 효과를 위해 추가
    padding: 10px;
    &:hover {
      font-weight: bold;
      color: #ffc700;
    }
    border: none;
  }

  button:first-child {
    border-right: 0.5px solid #dbdbdb;
    border-top: 0.5px solid #dbdbdb;
    border-bottom-left-radius: 10px; /* 왼쪽 하단의 radius를 지정합니다. */
  }

  button:last-child {
    border-left: 0.5px solid #dbdbdb;
    border-top: 0.5px solid #dbdbdb;
    border-bottom-right-radius: 10px; /* 오른쪽 하단의 radius를 지정합니다. */
  }
`;
