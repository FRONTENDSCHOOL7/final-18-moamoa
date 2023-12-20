import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AlertModal from '../Modal/AlertModal';
import { deleteComment } from '../../API/Comment/CommnetAPI';


CommentReportModal.propTypes = {
  commentid: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
}

export default function CommentReportModal({commentid, showModal , setShowModal}) {
  
  const params = useParams();
  const postId = params.post_id;
  const [showAlert, setShowAlert] = useState(true);

  const report = async() => {
    await deleteComment(postId, commentid)
    setShowAlert(false)
    setTimeout(()=>{
      setShowAlert(true)
      setShowModal(true)
    },1000)  
  }

  return (
    <>
      { !showModal &&
      <BgCont>
        <Modal>
          <Deltext>댓글을 신고 하시겠습니까?</Deltext>
          <Btn>
            <BtnDel onClick={report}>신고</BtnDel>
            <BtnCancel onClick={()=>setShowModal(true)}>취소</BtnCancel>
          </Btn>
        </Modal>
        { !showAlert? <AlertModal type={`report`}/>:null}
      </BgCont>
      }
    </>
  );
}
const BgCont = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 100
  ;
`;

const Modal = styled.div`
  width: 26rem;
  height: 14rem;
  background-color: #fff;
  border-radius: 1rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  &:hover{
    font-weight: bold;
  }
`;

const BtnDel = styled(BtnCancel)`
  color: #EB5757;
  border-right: 1px solid #dbdbdb;
`;



const Deltext = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  padding-bottom: 3rem;
  border-bottom: 1px solid #dbdbdb;
`;