import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import DeleteModal from '../../Components/Modal/DeleteModal';
import PropTypes from 'prop-types';

AskBtn.propTypes = {
  accountname: PropTypes.string,
  userName: PropTypes.string
}


export default function AskBtn({accountname, userName}) {

  const loginAccountName = useRecoilValue(accountNameAtom);
  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  const handleBtnClick = () => {
    navigate('/product/edit', { state: params });
  };
  const handleChatRoom = () => {
    navigate(`/chat/${userName}`);
  };
  return (
    <>
      {accountname !== loginAccountName ? (
        <Ask onClick={handleChatRoom}>
          문의하기
        </Ask>
      ) : (
        <>
          <Eidt onClick={handleBtnClick}>상품수정</Eidt>
          <Eidt onClick={() => setShowModal(false)}>상품삭제</Eidt>
          {!showModal && <DelCont><DeleteModal /></DelCont>}
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

const DelCont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;