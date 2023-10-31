import React, { useState } from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import PostModal from '../Modal/PostModal';
import { useRecoilValue } from 'recoil';
import accountNameAtom from '../../Recoil/accountNameAtom'; 
import ReportModal from '../Modal/ReportModal';

export default function MoreBtn(accountname) {
  const [showModal, setShowModal] = useState(false);
  const accountName = useRecoilValue(accountNameAtom);

  return (
    <>
      <PostMoreBtn onClick={()=> setShowModal((prev)=>!prev)}><MoreImg src={more} alt="더보기" /></PostMoreBtn>
      { showModal ? ( accountname === accountName ? <PostModal setShowModal = {setShowModal}/> : <ReportModal/>) : null}
    </>
  )

  
}

const PostMoreBtn = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
` ;
const MoreImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;
