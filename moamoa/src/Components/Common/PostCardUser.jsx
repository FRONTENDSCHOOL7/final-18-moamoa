import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MoreBtn from './MoreBtn';

PostCardUser.propTypes = {
  url: PropTypes.string,
  username: PropTypes.string,
  accountname: PropTypes.string
}

export default function PostCardUser({url, username, accountname }) {
  return (
    <Container>
      <Frofile>
        <>
          <UserInfo>
            <FrofileImg src={url} alt="사용자프로필"/>        
            <InfoText>
              <UserName>{username}</UserName>
              <AccountName>@{accountname}</AccountName>
            </InfoText>
          </UserInfo>
        </>
        <MoreBtn/>
      </Frofile>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  /* height: vw;
  margin: 0 auto; */

`;

const Frofile = styled.div`  
  margin: 0 auto;
  height: 4.2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
` ;
const FrofileImg = styled.img`
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 100%;
  margin-right: 1.2rem;
` ;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
` ;
const InfoText = styled.div`

`;

const UserName = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
` ;
const AccountName = styled.p` 
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: #767676;
` ;