import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

AddCommentBtn.propTypes = {
  addcomment: PropTypes.string
}


export default function AddCommentBtn({addcomment}) {
  return (    
    <>
    { addcomment === '' ? <AddBtn>게시</AddBtn> : <AddBtnOn>게시</AddBtnOn>}
    </>    
  )
}
const AddBtn = styled.button`
  width: 4.6rem;
  height: 4rem;
  border-radius: 1rem;
  border: 1px solid #C4C4C4;
  color: #C4C4C4;

`;

const AddBtnOn = styled(AddBtn)`
  background-color: #87B7E4;
  border: 1px solid #87B7E4;
  color: white;
`;