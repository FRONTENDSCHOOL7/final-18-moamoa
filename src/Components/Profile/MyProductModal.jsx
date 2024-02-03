/*
  설명: 행사 클릭시 화면에 나오는 모달
  작성자: 이해지
  마지막 수정 날까: 2024.02.03
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { deleteProduct } from '../../API/Product/ProductAPI';

import CloseIcon from '../../Assets/icons/x.png';
import ConfirmDelModal from './ConfirmDelModal';

import { ModalCont, Modal, Btn, BtnDel, BtnModify, BtnProductDesc } from './MyProductModalStyle';

export default function MyProductClick({
  userInfoData,
  reFetchInfo,
  productId,
  closeModal,
  fetchProduct,
}) {
  const navigate = useNavigate();

  const [showConfirmDelModal, setShowConfirmDelModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(true);
  console.log(userInfoData.profileAccountname);
  const delProduct = async () => {
    await deleteProduct(productId);

    closeModal();
    setShowNoticeModal(false);
    fetchProduct();
    reFetchInfo();
  };

  const openConfirmDelModal = () => {
    setShowConfirmDelModal(true); // 삭제 확인 모달을 열기
  };

  const closeConfirmDelModal = () => {
    setShowConfirmDelModal(false); // 삭제 확인 모달을 닫기
  };

  const productID = { product_id: productId };

  return (
    <ModalCont>
      {!showConfirmDelModal && (
        <Modal>
          <section>
            <Btn onClick={closeModal}>
              <img src={CloseIcon} alt='닫기' />
            </Btn>
            <BtnDel type='button' onClick={openConfirmDelModal}>
              삭제
            </BtnDel>
            <BtnModify
              type='button'
              onClick={() => {
                navigate(`/product/edit/${productId}`, { state: productID });
              }}
            >
              수정
            </BtnModify>
            <BtnProductDesc
              type='button'
              onClick={() => {
                navigate(`/product/detail/${productId}`, { state: productID });
              }}
            >
              상세 보기
            </BtnProductDesc>
          </section>
        </Modal>
      )}
      {showConfirmDelModal && (
        <ConfirmDelModal
          delProduct={delProduct}
          closeModal={closeConfirmDelModal}
          showNoticeModal={showNoticeModal}
        />
      )}
    </ModalCont>
  );
}

MyProductClick.propTypes = {
  userInfoData: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchProduct: PropTypes.func.isRequired,
  reFetchInfo: PropTypes.func.isRequired,
};
