import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export default function SearchResultSkeleton() {
  return (
    <SkeletonContainer>
      <div className='block'>
        <Skeleton className='photoSkeleton' />

        <div className='userInfoSkeleton'>
          <Skeleton className='idSkeleton' />
          <Skeleton className='introSkeleton' />
        </div>
      </div>

      <div className='block'>
        <Skeleton className='photoSkeleton' />
        <div className='userInfoSkeleton'>
          <Skeleton className='idSkeleton' />
          <Skeleton className='introSkeleton' />
        </div>
      </div>

      <div className='block'>
        <Skeleton className='photoSkeleton' />
        <div className='userInfoSkeleton'>
          <Skeleton className='idSkeleton' />
          <Skeleton className='introSkeleton' />
        </div>
      </div>

      <div className='block'>
        <Skeleton className='photoSkeleton' />
        <div className='userInfoSkeleton'>
          <Skeleton className='idSkeleton' />
          <Skeleton className='introSkeleton' />
        </div>
      </div>

      <div className='block'>
        <Skeleton className='photoSkeleton' />
        <div className='userInfoSkeleton'>
          <Skeleton className='idSkeleton' />
          <Skeleton className='introSkeleton' />
        </div>
      </div>
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .block {
    display: flex;
    align-items: center;
  }
  .userInfoSkeleton {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    gap: 6px;
  }
  .photoSkeleton {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .idSkeleton {
    width: 120px;
    height: 12px;
  }
  .introSkeleton {
    width: 150px;
    height: 12px;
  }
`;
