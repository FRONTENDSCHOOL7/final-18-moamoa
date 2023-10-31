import React from 'react'
import styled from 'styled-components';

export default function AddCommentBtn(addcomment) {

  console.log(addcomment)
  return (
    <>{ addcomment !== '' ? <AddBtn>게시</AddBtn> : <AddBtnOn>게시</AddBtnOn>}</>
    
  )
}
const AddBtn = styled.button`
  width: 4.6rem;
  height: 4rem;
  border-radius: 1rem;
  border: 1px solid #C4C4C4;
  color: #C4C4C4;

`;

const AddBtnOn = styled.button`
  width: 4.6rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: #87B7E4;
  color: white;

`;