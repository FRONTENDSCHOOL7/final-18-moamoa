import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserTypeCheck from '../../Assets/icons/icon-usertype-check.svg';

ArticleUserProfile.propTypes = {
  userProfileData: PropTypes.object
}

export default function ArticleUserProfile({ userProfileData }) {


  const profileImg = userProfileData?.profileImg;
  const userName = userProfileData?.userName;
  const accountName = userProfileData?.accountName;
  const loginAccountName = userProfileData?.loginAccountName;
  console.log(profileImg)


  return (
    <>
      {userProfileData && <Container>
          <>
            <Link to={ 
              loginAccountName === accountName ? 
              `/profile/myInfo`
              : `/profile/${accountName}`
            }>
              <UserInfo>
                <FrofileImg src={profileImg} alt="사용자프로필"/>        
                <InfoText>
                  <OrCont>
                    <UserName>{userName.slice(3)}</UserName>
                    {userName.slice(0,3) === '[o]'?                
                    <UserCheck src={UserTypeCheck} alt=''/> : null
                    }
                  </OrCont>
                  <AccountName>@{accountName}</AccountName>
                </InfoText>
              </UserInfo>
            </Link>
          </>
      </Container>}
    </>
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