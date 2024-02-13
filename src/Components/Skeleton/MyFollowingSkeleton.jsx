import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function MyFollowingSkeleton() {
  return (
    <Container>
      <MyFollowingBtn>
        <Skeleton className='btn'/>
      </MyFollowingBtn>
      <UserInfo>
        <ProfileImg>
          <Skeleton className='profileImg'/>
        </ProfileImg>
        <UserName>
          <Skeleton className='userInfo'/>
          <Skeleton className='userInfo'/>
        </UserName>
      </UserInfo>
      <UserInfo>
        <ProfileImg>
          <Skeleton className='profileImg'/>
        </ProfileImg>
        <UserName>
          <Skeleton className='userInfo'/>
          <Skeleton className='userInfo'/>
        </UserName>
      </UserInfo>
      <UserInfo>
        <ProfileImg>
          <Skeleton className='profileImg'/>
        </ProfileImg>
        <UserName>
          <Skeleton className='userInfo'/>
          <Skeleton className='userInfo'/>
        </UserName>
      </UserInfo>
    </Container>
    
  )
}

const Container = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
`

const MyFollowingBtn = styled.button`
  .btn{
    width: 308px;
    height: 45px;
    margin: 100px 0 20px 0;
    border-radius: 45px;
  }
  `

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 14px;
`;
const ProfileImg = styled.div`
  
  .profileImg{
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 100%;
  margin-right: 0.8rem;
  }
`;

const UserName = styled.div` 
  .userInfo{
  width: 11rem;
  height: 0.8rem;
  margin-bottom: 0.5rem; 
  }
`




