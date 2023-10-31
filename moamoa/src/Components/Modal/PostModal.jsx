import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import DeleteModal from './DeleteModal';

export default function PostModal() {

  const params = useParams();
  const editUrl = `/post/edit/${params.post_id}`
  const [open, setOpen] = useState(false);

  return (
    <Modal>
      <button onClick={()=>setOpen((prev)=>!prev)}>삭제</button>
      { open && <DeleteModal /> }
      <Link to={editUrl}><button>수정</button></Link>
    </Modal>
  )
}

const Modal = styled.div`
  width: 3.9rem;
  height: 100%;
  margin: auto;
  position: fixed;
  left: 0;
  top: 0;
`;


