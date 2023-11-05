import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

PostCardUser.propTypes = {
  url: PropTypes.string,
  username: PropTypes.string,
  accountname: PropTypes.string,
  loginAccountName: PropTypes.string
}

export default function PostCardUser({url, username, accountname, loginAccountName }) {
  return (
    <Container>
        <>
          <Link to={ 
            loginAccountName === accountname ? 
            `/profile/myInfo`
            : `/profile/${accountname}`
          }>
            <UserInfo>
              <FrofileImg src={url} alt="사용자프로필"/>        
              <InfoText>
                <UserName>{username}</UserName>
                <AccountName>@{accountname}</AccountName>
              </InfoText>
            </UserInfo>
          </Link>
        </>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  /* height: vw;
  margin: 0 auto; */

`;

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