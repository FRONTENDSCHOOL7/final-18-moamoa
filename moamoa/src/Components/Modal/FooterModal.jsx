import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import CloseIcon from '../../Assets/icons/x.png';
import PropTypes from 'prop-types';

FooterModal.propTypes = {
  postid: PropTypes.string,
  closeFooter: PropTypes.bool,
  setCloseFooter: PropTypes.func,
};

export default function FooterModal({ closeFooter, setCloseFooter, postid }) {
  const [showModal, setShowModal] = useState(true);
  console.log(postid);
  const editUrl = `/post/edit/${postid}`;

  return (
    <>
      {!closeFooter && (
        <ModalCont>
          <Modal>
            <Btn onClick={() => setCloseFooter((prev) => !prev)}>
              <img src={CloseIcon} alt='닫기' />
            </Btn>
            <BtnDel onClick={() => setShowModal((prev) => !prev)}>삭제</BtnDel>
            <Link to={editUrl}>
              <BtnModify>수정</BtnModify>
            </Link>
          </Modal>
          {!showModal ? (
            <DeleteModal
              postid={postid}
            />
          ) : null}
        </ModalCont>
      )}
    </>
  );
}

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
  height: 13.8rem;
  margin: auto;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  background-color: white;
  z-index: 10;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Btn = styled.button`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 0;
`;

const BtnModify = styled.button`
  width: 39rem;
  padding: 2rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: #4f9ee9;
  &:hover {
    font-weight: bold;
  }
`;

const BtnDel = styled(BtnModify)`
  margin-top: 1.2rem;
  border-bottom: 1px solid #dbdbdb;
  color: #eb5757;
`;
