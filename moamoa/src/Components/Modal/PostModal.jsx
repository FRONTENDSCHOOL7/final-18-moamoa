import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import CloseIcon from '../../Assets/icons/x.png'
import postModalOpenAtom from '../../Recoil/postModalOpenAtom';
import { useRecoilState } from 'recoil';
import postModalDelAtom from '../../Recoil/postModalDelAtom';

export default function PostModal() {

  const params = useParams();
  const editUrl = `/post/edit/${params.post_id}`
  const [showModal, setShowModal] = useRecoilState(postModalOpenAtom);
  const [delPost, setDelPost] = useRecoilState(postModalDelAtom);

  return (
    <>
      {showModal ? <ModalCont>
        <Modal>
          <Btn onClick={()=>setShowModal(false)}><img src={CloseIcon} alt="닫기" /></Btn>
          <BtnDel onClick={
            ()=>{
              setDelPost((prev)=>!prev)
            }
            }>삭제</BtnDel>
          <Link to={editUrl}><BtnModify>수정</BtnModify></Link>
        </Modal>
        { delPost && <DeleteModal /> }
      </ModalCont> : null}
    </>
  )
}

const ModalCont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 10;
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
  color: #4F9EE9;
  &:hover{
    font-weight: bold;
  }

`;

const BtnDel = styled(BtnModify)`
  margin-top: 1.2rem;
  border-bottom: 1px solid #dbdbdb;
  color: #EB5757;
`;


