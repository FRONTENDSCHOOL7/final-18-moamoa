import React, { useState } from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import CommentDelModal from './CommentDelModal';
import { useRecoilValue } from 'recoil';
import accountNameAtom from '../../Recoil/accountNameAtom'; 
import CommentReportModal from './CommentReportModal';
import PropTypes from 'prop-types';

MoreBtn.propTypes = {
  accountname: PropTypes.string,
  commentid: PropTypes.string
}

export default function MoreBtn({accountname,commentid}) {

  const accountName = useRecoilValue(accountNameAtom);
  const [showModal, setShowModal] = useState(true);
  
  return (
    <>
      <CommentMoreBtn onClick={()=> setShowModal(false)}><MoreImg src={more} alt="더보기" /></CommentMoreBtn>
      { !showModal ? (accountname === accountName ? <CommentDelModal commentid={commentid} closeFooter={showModal} setCloseFooter={setShowModal}/> : <CommentReportModal commentid={commentid} showModal={showModal} setShowModal={setShowModal}/>):null}

    </>
  )

  
}

const CommentMoreBtn = styled.button`
  width: 6rem;
  height: 1.8rem;
  cursor: pointer;
  position: relative;
` ;
const MoreImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  top: 0;
`;
