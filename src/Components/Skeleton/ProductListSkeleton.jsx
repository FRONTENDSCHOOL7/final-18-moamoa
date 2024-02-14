import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { ProductContainer } from '../Product/ProductStyle';
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
export const Nav = styled.nav`
  display: flex;
  margin: 10px auto;
  margin-top: 16px;
  max-width: 370px;
  .btn {
    width: 80px;
    height: 36px;
    border-radius: 10px;
    margin-right: 6px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
    max-width: 480px;
    margin-top: 0px;
  }
`;
export const SkeletonContainer = styled(ProductContainer)`
  gap: 20px;
  margin: 10px auto;
  margin-left: 10px;
  div {
    margin: 0 auto;
  }
  .itemImage {
    border-radius: 10px;
    width: 370px;
    height: 180px;
    margin-bottom: 5px;
    @media (min-width: 768px) {
      width: 280px;
    }
  }

  .itemName {
    margin: 0 auto;
    margin: 13px 0 6px 4px;
    width: 150px;
    height: 15px;
    @media (min-width: 768px) {
    }
  }
  .itemDate {
    margin-left: 4px;
    width: 140px;
  }
  @media (min-width: 768px) {
    grid-column-gap: 43px;
    grid-row-gap: 20px;
    max-width: 480px;
    margin: 0px auto;
  }
`;
