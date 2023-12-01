import React, { useState } from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import FooterModal from '../Modal/FooterModal';
import PropTypes from 'prop-types';
import accountNameAtom from '../../Recoil/accountNameAtom';
import { useRecoilValue } from 'recoil';
import ReportModal from '../Modal/ReportModal';

PostMoreBtn.propTypes = {
  btnData: PropTypes.object
}

export default function PostMoreBtn({btnData}) {
  const {postId, accountName} = btnData
  const loginAccountName = useRecoilValue(accountNameAtom);
  const [showModal, setShowModal] = useState(true);
  const openModal = () => {
    setShowModal((prev)=>!prev)    
  }
  return (
    <>
      <MoreBtn onClick={openModal}><MoreImg src={more} alt="더보기" /></MoreBtn>
      { !showModal && (loginAccountName === accountName)? <FooterModal postid={postId} closeFooter={showModal} setCloseFooter={setShowModal}/> : <ReportModal closemodal={showModal} setclosemodal={setShowModal} postid={postId}/>}
    </>
  )

  
}

const MoreBtn = styled.button`
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
