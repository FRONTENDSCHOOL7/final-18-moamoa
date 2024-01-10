import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AlertModal from '../Modal/AlertModal';
import { deleteComment } from '../../API/Comment/CommnetAPI';

CommentDelModal.propTypes = {
  commentid: PropTypes.string,
  setCloseFooter: PropTypes.func,
};

export default function CommentDelModal({ commentid, setCloseFooter }) {
  const params = useParams();
  const postId = params.post_id;
  const [modal, setModal] = useState(true);
  const [delMadoal, setDelModal] = useState(true);
  const [showNoticeModal, setShowNoticeModal] = useState(true);

  const handleCommemtDelete = async () => {
    await deleteComment(postId, commentid);
    setShowNoticeModal(false);
    setCloseFooter(true);
    setTimeout(() => {
      setShowNoticeModal(false);
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
          {!showNoticeModal && <AlertModal type={`delete`} />}
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
  top: 50%;
  transform: translate(-50%,-50%);
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
