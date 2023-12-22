import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AlertModal from '../Modal/AlertModal';

export default function ConfirmDelModal({ delProduct, closeModal, showNoticeModal }) {
  return (
    <>
      <ConfirmModal>
        <Deltext>정말 삭제하시겠습니까?</Deltext>
        <BtnWrap>
          <DelBtn onClick={delProduct}>삭제</DelBtn>
          <CancelBtn onClick={closeModal}>취소</CancelBtn>
        </BtnWrap>
      </ConfirmModal>
      {!showNoticeModal && <AlertModal />}
    </>
  );
}

ConfirmDelModal.propTypes = {
  delProduct: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  showNoticeModal: PropTypes.bool.isRequired,
};

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

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Deltext = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  padding-bottom: 3rem;
  border-bottom: 1px solid #dbdbdb;
`;

const CancelBtn = styled.button`
  width: 12.5rem;
  height: 6.5rem;
  font-size: 1.4rem;
  color: #000;
  &:hover {
    font-weight: bold;
  }
`;

const DelBtn = styled(CancelBtn)`
  color: #eb5757;
  border-right: 1px solid #dbdbdb;
`;
