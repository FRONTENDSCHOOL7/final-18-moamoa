import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import PropTypes from 'prop-types';

DeleteModal.propTypes = {
  commentid: PropTypes.string,
  setCloseFooter: PropTypes.func,
};

export default function DeleteModal({ commentid, setCloseFooter }) {
  const token = useRecoilValue(userTokenAtom);
  const params = useParams();
  const [modal, setModal] = useState(true);
  const [delMadoal, setDelModal] = useState(true);
  const [showNoticeModal, setShowNoticeModal] = useState(true);

  const delComment = () => {
    const delReq = () => {
      axios
        .delete(`https://api.mandarin.weniv.co.kr/post/${params.post_id}/comments/${commentid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        })
        .then(() => {})
        .catch(() => console.error('댓글 삭제를 실패했습니다.'));
    };

    delReq();
  };

  const handleCommemtDelete = async () => {
    await delComment();
    setShowNoticeModal(false);
    setCloseFooter(true);
    // 추후 수정 필요
    setTimeout(() => {
      setShowNoticeModal(true);
    }, 1000);
  };

  return (
    <>
      {modal && delMadoal ? (
        <BgCont>
          <Modal>
            <Deltext>정말 삭제하시겠습니까?</Deltext>
            <Btn>
              <BtnDel onClick={handleCommemtDelete}>삭제</BtnDel>
              <BtnCancel
                onClick={() => {
                  setModal((prev) => !prev);
                  setDelModal((prev) => !prev);
                  setCloseFooter((prev) => !prev);
                }}
              >
                취소
              </BtnCancel>
            </Btn>
          </Modal>
          {!showNoticeModal && <NoticeModal />}
        </BgCont>
      ) : null}
    </>
  );
}

const BgCont = styled.div`
  width: 100%;
  height: 170vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  &::-webkit-scrollbar {
    display: none;
  }
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
  z-index: 10;
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
