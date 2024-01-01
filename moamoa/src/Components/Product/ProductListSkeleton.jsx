import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Nav, SkeletonContainer } from './ProductStyle';

export default function ProductListSkeleton() {
  return (
    <>
      <Nav>
        <Skeleton className='btn' />
        <Skeleton className='btn' />
      </Nav>
      <SkeletonContainer>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
        <div>
          <Skeleton className='itemImage' />
          <Skeleton className='itemName'></Skeleton>
          <Skeleton className='itemDate' />
        </div>
      </SkeletonContainer>
    </>
  );
}
