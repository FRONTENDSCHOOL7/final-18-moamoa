import React, { useState } from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import FooterModal from '../Modal/FooterModal';
import { useRecoilValue } from 'recoil';
import accountNameAtom from '../../Recoil/accountNameAtom'; 
import ReportModal from '../Modal/ReportModal';

export default function MoreBtn(accountname) {
  const accountName = useRecoilValue(accountNameAtom);
  const [showModal, setShowModal] = useState(true);
  const openModal = () => {
    setShowModal(false)    
  }

  return (
    <>
      <PostMoreBtn onClick={openModal}><MoreImg src={more} alt="더보기" /></PostMoreBtn>
      { !showModal ? (accountname.accountname === accountName ? <FooterModal closeFooter={showModal} setCloseFooter={setShowModal}/> : <ReportModal/>):null}
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
