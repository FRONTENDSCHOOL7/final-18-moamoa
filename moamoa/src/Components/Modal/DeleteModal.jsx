import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import ProductDeleteAPI from '../../API/Product/ProductDeleteAPI';
import PostDeleteAPI from '../../API/Post/PostDeleteAPI';
import PropTypes from 'prop-types';

DeleteModal.propTypes = {
  postid: PropTypes.string
};

export default function DeleteModal({postid}) {
  const token = useRecoilValue(userTokenAtom);
  const params = useParams();
  const navigate = useNavigate();
  const [delMadoal, setDelModal] = useState(true);
  const [postId, setPostId] =  useState(postid)
  const location = useLocation();
  const post = location.pathname.slice(1, 5);

  // 게시글 상세 페이지에서 게시글 삭제
  const handlePostDelete = () => PostDeleteAPI(token, postId)
  const deletePost = async () => {
      await handlePostDelete();
      alert('게시물이 삭제되었습니다.');
      navigate(-1);
      setDelModal(false);
      setPostId(null);
    };

  // myInfo 페이지에서 게시글 삭제
  const delMyPostListItem = async () => {
    await handlePostDelete();
    alert('게시글이 삭제되었습니다.');
    setDelModal(false);
    window.location.reload();
  };

    // 상품 상세 페이지에서 상품 삭제
    const handleProductDelete = () => ProductDeleteAPI(params, token);
    const deleteProduct = async () => {
      await handleProductDelete();
      alert('게시물이 삭제되었습니다.');
      navigate('/product/list');
    };
  
    const deletefunc = () => {
      if(post === "prof"){
        delMyPostListItem();
      } else if(post === "post"){
        deletePost();
      } else {
        deleteProduct();
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
