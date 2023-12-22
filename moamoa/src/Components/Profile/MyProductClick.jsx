import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteProduct } from '../../API/Product/ProductAPI';

import CloseIcon from '../../Assets/icons/x.png';
import ConfirmDelModal from './ConfirmDelModal';

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

const ModalCont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
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
`;

const Btn = styled.button`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 0;
`;

const BtnDel = styled.button`
  width: 39rem;
  padding: 2rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: #eb5757;
  &:hover {
    font-weight: bold;
  }
`;

const BtnModify = styled(BtnDel)`
  color: #4f9ee9;
  border-top: 1px solid #dbdbdb;
  padding-top: 2.5rem;
`;

const BtnProductDesc = styled(BtnModify)`
  color: #000;
`;
