/* eslint-disable */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { ProductContainer, ProductBox } from './ProductOutput';

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
  margin: 0 auto;
  margin-left: 10px;
  .itemImage {
    border-radius: 10px;
    width: 172px;
    height: 110px;
  }

  .itemName {
    margin: 0 auto;
    margin: 12px 0 6px 4px;
    width: 160px;
  }
  .itemDate {
    margin-left: 4px;
    width: 160px;
  }
`;
