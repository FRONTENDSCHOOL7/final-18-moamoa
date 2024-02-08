import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MyProfileSkeleton() {
  return (
    <Btns>
      <Skeleton className='FollowButton' />
      <div>
        <Skeleton className='CircleBtn' />
        <Skeleton className='CircleBtn' />
      </div>
    </Btns>
  );
}
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

  .FollowButton {
    width: 12rem;
    padding: 8px 0;
    border: 1px;
    border-radius: 30px;
    height: 1.4rem;

    @media (min-width: 1200px) {
      position: relative;
      margin: 0 45px;
    }
  }

  div {
    display: flex;
    gap: 8px;
    justify-content: flex-end;

    @media (min-width: 1200px) {
      position: absolute;
      width: 234px;
      justify-content: space-between;
    }
  }

  .CircleBtn {
    width: 35px;
    height: 35px;

    border-radius: 50%;
  }
`;
