import React from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import PostModal from '../Modal/PostModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import accountNameAtom from '../../Recoil/accountNameAtom'; 
import ReportModal from '../Modal/ReportModal';
import postModalOpenAtom from '../../Recoil/postModalOpenAtom';

export default function MoreBtn(accountname) {
  const accountName = useRecoilValue(accountNameAtom);
  const [showModal, setShowModal] = useRecoilState(postModalOpenAtom);

  return (
    <>
      <PostMoreBtn onClick={(e)=> {e.preventDefault(); setShowModal((prev)=>!prev)}}><MoreImg src={more} alt="더보기" /></PostMoreBtn>
      { showModal ? ( accountname.accountname === accountName ? <PostModal /> : <ReportModal/>) : null}
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
