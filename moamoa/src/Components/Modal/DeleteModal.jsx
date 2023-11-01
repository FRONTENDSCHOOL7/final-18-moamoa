import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import postModalDelAtom from '../../Recoil/postModalDelAtom';
import ProductDeleteAPI from '../../API/Product/ProductDeleteAPI';

export default function DeleteModal() {
  const token = useRecoilValue(userTokenAtom);
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [delMadoal, setDelModal] = useRecoilState(postModalDelAtom);

  const location = useLocation();
  const post = location.pathname.slice(1, 5);
  console.log(post);

  const delPost = () => {
    const delReq = () => {
      axios
        .delete(`https://api.mandarin.weniv.co.kr/post/${params.post_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        })
        .then(() => {
          alert('게시글이 삭제되었습니다.');
          navigate(-1);
        })
        .catch(() => console.error('게시글 삭제를 실패했습니다.'));
    };

    delReq();
  };

  const handleProductDelete = ProductDeleteAPI(params);
  const handleDelete = async () => {
    await handleProductDelete();
    navigate('/product/list');
  };

  return (
    <>
      {showModal && delMadoal ? (
        <Modal>
          <Deltext>정말 삭제하시겠습니까?</Deltext>
          <Btn>
            <BtnDel onClick={post === 'post' ? () => delPost() : () => handleDelete()}>삭제</BtnDel>
            <BtnCancel
              onClick={() => {
                setShowModal((prev) => !prev);
                setDelModal((prev) => !prev);
              }}
            >
              취소
            </BtnCancel>
          </Btn>
        </Modal>
      ) : null}
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
