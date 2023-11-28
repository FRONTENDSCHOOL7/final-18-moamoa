import React, { useState } from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import FooterModal from '../Modal/FooterModal';
import PropTypes from 'prop-types';

PostMoreBtn.propTypes = {
  postid: PropTypes.string,
  accountname: PropTypes.string
}

export default function PostMoreBtn({accountname, postid}) {
  const [showModal, setShowModal] = useState(true);
  const openModal = () => {
    setShowModal((prev)=>!prev)    
  }
  return (
    <>
      <MoreBtn onClick={openModal}><MoreImg src={more} alt="더보기" /></MoreBtn>
      { !showModal ? <FooterModal postid={postid} accountname={accountname} closeFooter={showModal} setCloseFooter={setShowModal}/>:null}
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
