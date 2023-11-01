import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import userNameAtom from '../../Recoil/userNameAtom';
import PostModal from '../../Components/Modal/PostModal';
import postModalOpenAtom from '../../Recoil/postModalOpenAtom';

export default function AskBtn(username) {
  const userName = useRecoilValue(userNameAtom);
  const [showModal, setShowModal] = useRecoilState(postModalOpenAtom);

  const navigate = useNavigate();
  const params = useParams();

  const handleBtnClick = () => {
    navigate('/product/edit', { state: params });
  };


  return (
    <>
      {username.username !== userName ? (
        <Ask>문의하기</Ask>
      ) : (
        <>
          <Eidt onClick={handleBtnClick}>상품수정</Eidt>
          <Eidt onClick={()=>setShowModal((prev)=>!prev)}>상품삭제</Eidt>
          {showModal &&<PostModal />}
        </>
      )}
    </>
  );
}

const Ask = styled.button`
  width: 10rem;
  height: 2.8rem;
  border-radius: 2rem;
  background: #87b7e4;
  color: white;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    background-color: #4f9ee9;
  }
  margin-left: 1rem;
  padding: 0 1.8rem;
`;

const Eidt = styled.button`
  width: 10rem;
  height: 2.8rem;
  border-radius: 2rem;
  border: 2px solid #dbdbdb;
  color: #767676;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    background-color: #dbdbdb;
    color: #000;
  }
  margin-left: 1rem;
`;
