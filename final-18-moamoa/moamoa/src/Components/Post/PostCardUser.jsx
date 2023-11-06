import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserTypeCheck from '../../Assets/icons/icon-usertype-check.svg';

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
                <OrCont>
                  <UserName>{username.slice(3)}</UserName>
                  {username.slice(0,3) === '[o]'?                
                  <UserCheck src={UserTypeCheck} alt=''/> : null
                  }
                </OrCont>
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
  margin-right: 0.8rem;
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

const OrCont = styled.div`
  display: flex;
  align-items: center;
  vertical-align: top;
`;

const UserCheck = styled.img`
  padding-left: 0.3rem;
  width: 1.2rem
`;