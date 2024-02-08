import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProfileDetailSkeleton from '../../Components/Profile/ProfileDetailSkeleton';
import ProfileDetailProductSkeleton from '../../Components/Profile/ProfileDetailProductSkeleton';

export default function MyProfileSkeleton() {
  return (
    <>
      <ProfileTop>
        <ProfileDetailSkeleton />
        <Btns>
          <Skeleton className='myProfileBtn' />
          <Skeleton className='myProfileBtn' />
        </Btns>
      </ProfileTop>
      <ProfileDetailProductSkeleton />
    </>
  );
}

const ProfileTop = styled.div`
  position: relative;
  margin-top: 48px;
  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`;

const Btns = styled.div`
  position: absolute;
  top: 128px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (min-width: 1200px) {
    position: absolute;
    flex-direction: row;
    top: 214px;
    right: 50%;
    transform: translateX(50%);
  }

  .myProfileBtn {
    width: 12rem;
    padding: 8px 0;
    border: 1px;
    border-radius: 30px;
    height: 1.4rem;
  }
`;
