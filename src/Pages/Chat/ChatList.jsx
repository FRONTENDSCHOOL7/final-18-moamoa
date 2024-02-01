import React from 'react';
import NavBar from '../../Components/Common/NavBar';
import { ContainerVh } from '../../Components/Common/Container';
import img from '../../Assets/images/followImg/fog.jpg';
import img2 from '../../Assets/images/followImg/human.jpg';
import img3 from '../../Assets/images/followImg/woman2.jpg';
import { Link } from 'react-router-dom';
import Header from '../../Components/Common/Header/Header';
import {
  ChatListWrap,
  SearchWrap,
  SearchPhotoWrap,
  SearchImg,
  UserInfo,
  UserId,
  UserText,
  ChatDateBox,
  ChatDate,
} from './ChatStyle';

export default function ChatList() {
  return (
    <div>
      <ContainerVh>
        <Header type='moreKebab' />
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

          <NavBar></NavBar>
        </ChatListWrap>
      </ContainerVh>
    </div>
  );
}
