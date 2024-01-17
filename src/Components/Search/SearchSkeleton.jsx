import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { SkeletonContainer } from './SearchStyle';

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
