import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { deleteProduct } from '../../API/Product/ProductAPI';
import { deletePost } from '../../API/Post/PostAPI';
import PropTypes from 'prop-types';
import NoticeModal from './DeleteAlert';

DeleteModal.propTypes = {
  postid: PropTypes.string
};

export default function DeleteModal({postid}) {
  const params = useParams();
  const navigate = useNavigate();
  const [delMadoal, setDelModal] = useState(true);
  const [postId, setPostId] =  useState(postid)
  const location = useLocation();
  const post = location.pathname.slice(1, 5);
  const [showNoticeModal, setShowNoticeModal] = useState(true);

  // 게시글 상세 페이지에서 게시글 삭제
  const handlePostDelete = () => deletePost(postId)
  const deletePostItem = async () => {
    await handlePostDelete();
    setShowNoticeModal(false);
    await setTimeout(() => {
      navigate(-1);
    }, 1000);
      setDelModal(false);
      setPostId(null);
    };

  // myInfo 페이지에서 게시글 삭제
  const delMyPostListItem = async () => {
    await handlePostDelete();
    setShowNoticeModal(false);
    setDelModal(false);
    await setTimeout(() => {
      setDelModal(false);
      setPostId(null);
      window.location.reload();  
    }, 1000);
  };

    // 상품 상세 페이지에서 상품 삭제
    const handleProductDelete = () => deleteProduct(params.product_id);
    
    const deleteProducData = async () => {
      await handleProductDelete();
      setShowNoticeModal(false);
      await setTimeout(() => {
        navigate('/product/list');
      }, 1000);
    };
  
    const deletefunc = () => {
      if(post === "prof"){
        delMyPostListItem();
      } else if(post === "post"){
        useEffect(()=>{ 
          deletePostItem();
        },[postId])
      } else {
          deleteProducData();
      }      
    }

  return (
    <>
      { delMadoal ?       
      <Modal>
        <Deltext>정말 삭제하시겠습니까?</Deltext>
        <Btn>
          <BtnDel onClick={deletefunc}>삭제</BtnDel>
          <BtnCancel onClick={()=>{setDelModal(false);}}>취소</BtnCancel>
        </Btn>
      </Modal> : null
      }
      { !showNoticeModal && <NoticeModal/>}
    </>
  );
}

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
