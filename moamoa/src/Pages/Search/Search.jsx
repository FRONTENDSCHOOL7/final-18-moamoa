import React from 'react';
import { Container } from '../../Components/Common/Container';
import HeaderSearch from '../../Components/Common/HeaderSearch';
import img from '../../Assets/images/followImg/child.jpg';
import img2 from '../../Assets/images/followImg/dog.jpg';
import img3 from '../../Assets/images/followImg/water.jpg';
import styled from 'styled-components';
export default function Search() {
  return (
    <Container>
      <HeaderSearch></HeaderSearch>
      <SearchWrap>
        <SearchPhotoWrap>
          <SearchImg src={img} alt='' />
        </SearchPhotoWrap>
        <UserInfo>
          <UserId>수미아빠</UserId>
          <UserText>마크업만 구현한 수미아빠입니다~</UserText>
        </UserInfo>
      </SearchWrap>
      <SearchWrap>
        <SearchPhotoWrap>
          <SearchImg src={img2} alt='' />
        </SearchPhotoWrap>
        <UserInfo>
          <UserId>돌돌이 형</UserId>
          <UserText>마크업만 구현한 돌돌이형</UserText>
        </UserInfo>
      </SearchWrap>
      <SearchWrap>
        <SearchPhotoWrap>
          <SearchImg src={img3} alt='' />
        </SearchPhotoWrap>
        <UserInfo>
          <UserId>흑곰</UserId>
          <UserText>수련하러 갑니다.</UserText>
        </UserInfo>
      </SearchWrap>
    </Container>
  );
}
const SearchImg = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 50px;
`;
const SearchWrap = styled.div`
  width: 358px;
  height: 50px;

  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 16px;
  Button {
    font-size: 12px;
    font-weight: bold;
    margin-left: 80px;
  }
`;
const SearchPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const UserId = styled.h2`
  font-size: 14px;
`;
const UserText = styled.span`
  color: #767676;
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
