import React from 'react';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';
import styled from 'styled-components';

// import Gobackbtn from '../../Components/Common/GoBackbtn';
// import MoreBtn from '../../Components/Common/MoreBtn';

import img from '../../Assets/images/followImg/fog.jpg';
import img2 from '../../Assets/images/followImg/human.jpg';
import img3 from '../../Assets/images/followImg/woman2.jpg';
import { Link } from 'react-router-dom';
import HeaderKebab from '../../Components/Common/HeaderKebab';
export default function ChatList() {
  return (
    <div>
      <Container>
        <HeaderKebab />
        <ChatListWrap>
          <SearchWrap>
            <SearchPhotoWrap>
              <SearchImg src={img} alt='' />
            </SearchPhotoWrap>

            <Link to='/chat/kim'>
              <UserInfo className='unRead'>
                <UserId>양떼목장 김사장</UserId>
                <UserText>애들이 많이 놀러와~</UserText>
              </UserInfo>
            </Link>
            <ChatDateBox>
              <ChatDate>2023.10.25</ChatDate>
            </ChatDateBox>
          </SearchWrap>
          <SearchWrap>
            <SearchPhotoWrap>
              <SearchImg src={img2} alt='' />
            </SearchPhotoWrap>
            <Link to='/chat/sumiDad'>
              <UserInfo>
                <UserId>텃밭체험 수미아빠</UserId>
                <UserText>토마토가 증말 맛있어~</UserText>
              </UserInfo>
            </Link>
            <ChatDateBox>
              <ChatDate>2023.10.25</ChatDate>
            </ChatDateBox>
          </SearchWrap>
          <SearchWrap>
            <SearchPhotoWrap>
              <SearchImg src={img3} alt='' />
            </SearchPhotoWrap>
            <Link to='/chat/darkHorse'>
              <UserInfo>
                <UserId>승마체험 곽사장</UserId>
                <UserText>말 밥 먹이러 올래?</UserText>
              </UserInfo>
            </Link>
            <ChatDateBox>
              <ChatDate>2020.10.25</ChatDate>
            </ChatDateBox>
          </SearchWrap>

          <Footer></Footer>
        </ChatListWrap>
      </Container>
    </div>
  );
}

const ChatListWrap = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 48px;
`;

const SearchImg = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 50px;
`;
const SearchWrap = styled.div`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;

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
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  &.unRead::after {
    content: '';
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50px;
    background-color: tomato;
    left: 0px;
    top: 0px;
  }
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
const ChatDate = styled.span`
  color: #dbdbdb;
  font-size: 10px;
`;

const ChatDateBox = styled.div`
  display: flex;
  vertical-align: baseline;
  margin-left: 50px;
  position: absolute;
  bottom: 22%;
  right: 0px;
`;
