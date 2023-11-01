import React from 'react'
import styled from 'styled-components';
import more from '../../Assets/icons/s-icon-more-vertical.svg'
import PostModal from '../Modal/PostModal';
// import ReportModal from '../Modal/ReportModal';
import postModalOpenAtom from '../../Recoil/postModalOpenAtom';
import { useRecoilState } from 'recoil';

export default function MoreBtn() {


  const [showModal, setShowModal] = useRecoilState(postModalOpenAtom);
  return (
    <>
      <CommentMoreBtn onClick={()=> setShowModal((prev)=>!prev)}><MoreImg src={more} alt="더보기" /></CommentMoreBtn>
      { showModal && <PostModal/>}

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
