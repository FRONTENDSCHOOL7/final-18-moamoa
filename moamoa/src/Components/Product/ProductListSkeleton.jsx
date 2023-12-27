import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { ProductContainer } from './ProductOutput';

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
const Nav = styled.div`
  display: flex;
  padding: 10px;
  .btn {
    width: 80px;
    height: 36px;
    border-radius: 10px;
    margin-right: 6px;
  }
`;

const SkeletonContainer = styled(ProductContainer)`
  gap: 20px;
  margin: 10px auto;
  margin-left: 10px;
  .itemImage {
    border-radius: 10px;
    width: 370px;
    height: 140px;
    margin-bottom: 5px;
  }

  .itemName {
    margin: 0 auto;
    margin: 13px 0 6px 4px;
    width: 150px;
    height: 15px;
  }
  .itemDate {
    margin-left: 4px;
    width: 140px;
  }
`;
