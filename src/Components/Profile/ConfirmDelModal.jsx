/*
  설명: 행사 삭제 확인 모달
  작성자: 이해지
  마지막 수정 날까: 2024.02.03
*/

import React from 'react';
import PropTypes from 'prop-types';
import AlertModal from '../Modal/AlertModal';

import { ConfirmModal, Deltext, BtnWrap, DelBtn, CancelBtn } from './MyProductModalStyle';

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
