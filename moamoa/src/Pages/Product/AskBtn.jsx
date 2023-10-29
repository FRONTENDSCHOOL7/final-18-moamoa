import React from 'react'
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import userTypeAtom from '../../Recoil/userTypeAtom';




export default function AskBtn(accountname) {

  const userType = useRecoilValue(userTypeAtom)

  console.log(userType);
  console.log(userType.accountname);
  return (
    <>
    { accountname.accountname !==  userType.accountname ? 
      <Ask>문의하기</Ask> : <><Eidt>상품수정</Eidt><Eidt>상품삭제</Eidt></>
    }
    </>
    
  )
}

const Ask = styled.button`
  width: 10rem;
  height: 2.8rem;
  border-radius: 2rem;
  background: #87B7E4;
  color: white;
  font-size: 1.2rem;
  &:hover{
    cursor: pointer;
    background-color: #4F9EE9;
  }
  margin-left: 1rem;
  padding: 0 1.8rem;
`;

const Eidt = styled.button`
  width: 10rem;
  height: 2.8rem;
  border-radius: 2rem;
  border: 2px solid #DBDBDB;
  color: #767676;
  font-size: 1.2rem;
  &:hover{
    cursor: pointer;
    background-color: #DBDBDB;
    color: #000;
  }
  margin-left: 1rem;
`;