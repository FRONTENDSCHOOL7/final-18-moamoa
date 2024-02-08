import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProfileDetailSkeleton() {
  return (
    <UserInfo>
      <ProfileImg>
        <Skeleton className='profileImg' />
      </ProfileImg>
      <ProfileInfo>
        <div>
          <Skeleton className='profileName profileInfo' />
          <Skeleton className='profileID profileInfo' />
        </div>
        <Skeleton className='profileIntro profileInfo' />
      </ProfileInfo>
      <CountWrap>
        <Skeleton className='Count' />
        <div className='span'></div>
        <Skeleton className='Count' />
        <div className='span'></div>
        <Skeleton className='Count' />
      </CountWrap>
    </UserInfo>
  );
}

const UserInfo = styled.section``;

const ProfileImg = styled.div`
  // box-shadow: 0 0 0 3px #000 inset;
  padding-top: 65px;
  padding-left: 20px;

  .profileImg {
    width: 110px;
    height: 110px;
    border-radius: 50%;

    @media (min-width: 1200px) {
      display: flex;
      margin: 0 auto;

      width: 120px;
      height: 120px;
    }
  }
  @media (min-width: 1200px) {
    padding: 0px;
    padding-top: 5px;
  }
`;

const ProfileInfo = styled.div`
  // box-shadow: 0 0 0 3px red inset;
  padding: 10px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .profileName {
    width: 9.3rem;
    height: 1.6rem;
    margin-bottom: 0.3rem;
    margin-top: 0.6rem;

    @media (min-width: 1200px) {
      margin-top: 0px;
    }
  }

  .profileID {
    margin-top: 0px;
    width: 6.8rem;
    height: 1.2rem;
  }
  .profileIntro {
    width: 9rem;
    height: 1.4rem;
  }

  @media (min-width: 1200px) {
    align-items: center;
    div {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    margin-bottom: 55px;
    padding: 0px;
  }
`;

const CountWrap = styled.div`
  // box-shadow: 0 0 0 3px green inset;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 14px 0;
  text-align: center;

  .Count {
    width: 5.4rem;
    height: 3.5rem;
  }

  .span {
    width: 0.5px;
    height: 22px;
  }
`;
