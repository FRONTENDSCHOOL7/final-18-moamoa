import React, { useState } from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import ReportModal from '../Modal/ReportModal';

export default function HomePostMoreBtn(postid) {

  const [showModal, setShowModal] = useState(true);
  const openModal = () => setShowModal((prev)=>!prev)

  return (
    <>
      <PostMoreBtn onClick={openModal}><MoreImg src={more} alt="더보기" /></PostMoreBtn>
      { !showModal ? <ReportModal closemodal={showModal} setclosemodal={setShowModal} postid={postid.postid}/>:null}
    </>
  )

  
}

const PostMoreBtn = styled.button`
  width: 6rem;
  height: 1.8rem;
  cursor: pointer;
  position: relative;
` ;
const MoreImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  right: 0;
  top: 0;
`;
