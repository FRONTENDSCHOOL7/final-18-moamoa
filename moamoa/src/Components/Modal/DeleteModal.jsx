import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';

export default function DeleteModal() {
  
  const token = useRecoilValue(userTokenAtom);
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  const delPost = () => {
    const delReq = () => {
      axios.delete(`https://api.mandarin.weniv.co.kr/post/${params.post_id}`,{
        headers:{          
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        }
      }).then(()=>{
        alert('게시글이 삭제되었습니다.');
        navigate(-1)
      }).catch(()=>console.error('게시글 삭제를 실패했습니다.'))
        alert('내가 작성한 게시글만 삭제할 수 있습니다.')
      }

    delReq();
      }

  return (
    <>
      { showModal ?       
      <Modal>
        <p>정말 삭제하시겠습니까?</p>
        <Btn onClick={()=>delPost()}>삭제</Btn>
        <Btn onClick={()=>setShowModal((prev)=>!prev)}>취소</Btn>
      </Modal> : null
      }
    </>
  );
}

const Modal = styled.div`
  width: 12rem;
  height: 3rem;
  background-color: #ddd;
`;

const Btn = styled.button`
  width: 3rem;
  height: 2rem;
  background-color: gold;
  margin-left: 1rem;
`;
