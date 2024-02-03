import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProfileSkeleton() {
  return (
    <div>
      <Skeleton className='ProfileContainer' />
    </div>
  );
}
