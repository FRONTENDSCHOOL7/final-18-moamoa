import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { deleteProduct } from '../../API/Product/ProductAPI';
import { deletePost } from '../../API/Post/PostAPI';
import PropTypes from 'prop-types';
import AlertModal from './AlertModal';

DeleteModal.propTypes = {
  postid: PropTypes.string,
  setPostId: PropTypes.func,
  setCloseFooter: PropTypes.func.isRequired
};

export default function DeleteModal({postid,setPostId, setCloseFooter}) {
  const params = useParams();
  const navigate = useNavigate();
  const [delMadoal, setDelModal] = useState(true);
  const location = useLocation();
  const path = location.pathname.slice(1, 5);
  const [showNoticeModal, setShowNoticeModal] = useState(true);

  // 게시글 상세 페이지에서 게시글 삭제
  const handlePostDelete = async () => {
    await deletePost(postid);
    setShowNoticeModal(false);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
      setDelModal(false);
    };

  // myInfo 페이지에서 게시글 삭제
  const delMyPostListItem = async () => {
    await deletePost(postid);
    setShowNoticeModal(false);
    setDelModal(false);
    setPostId(null);
    setTimeout(() => {
      setDelModal(false);
      setCloseFooter(true)
    }, 1000);
  };

  // 상품 상세 페이지에서 상품 삭제
  const handleProductDelete = async () => {
    await deleteProduct(params.product_id);
    setShowNoticeModal(false);
    setTimeout(() => {
      navigate('/product/list');
    }, 1000);
  };
  
    const deletefunc = () => {
      switch(path){
        case 'prof':
          delMyPostListItem();
          break;
        case 'post':
          handlePostDelete();
          break;
        case 'prod':
          handleProductDelete();
          break;
        default:
          break;
      }
    }

  return (
    <>
      { delMadoal ?       
      <ModalBg>
        <Modal>
          <Deltext>정말 삭제하시겠습니까?</Deltext>
          <Btn>
            <BtnDel onClick={deletefunc}>삭제</BtnDel>
            <BtnCancel onClick={()=>{setDelModal(false);}}>취소</BtnCancel>
          </Btn>
        </Modal>
      </ModalBg> : null
      }
      { !showNoticeModal && <AlertModal type={`delete`}/>}
    </>
  );
}

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
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
