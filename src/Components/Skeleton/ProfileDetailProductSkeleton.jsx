import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProfileDetailProductSkeleton() {
  return (
    <ProductItro>
      <H2>
        <Skeleton className='header' />
      </H2>
      <ProfileProductWrapper>
        <ProfileProduct>
          <ProductListBox>
            <ProductBox>
              <Skeleton className='itemImg' />
              <Skeleton className='itemName' />
              <Skeleton className='itemDate' />
            </ProductBox>
            <ProductBox>
              <Skeleton className='itemImg' />
              <Skeleton className='itemName' />
              <Skeleton className='itemDate' />
            </ProductBox>
            <ProductBox>
              <Skeleton className='itemImg' />
              <Skeleton className='itemName' />
              <Skeleton className='itemDate' />
            </ProductBox>
            <ProductBox>
              <Skeleton className='itemImg' />
              <Skeleton className='itemName' />
              <Skeleton className='itemDate' />
            </ProductBox>

            <ProductBox>
              <Skeleton className='itemImg' />
              <Skeleton className='itemName' />
              <Skeleton className='itemDate' />
            </ProductBox>
          </ProductListBox>
        </ProfileProduct>
      </ProfileProductWrapper>
    </ProductItro>
  );
}

const ProductItro = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 16px;

  gap: 10px;

  // p:first-child {
  //   color: #000;
  //   font-size: 1.6rem;
  //   margin-bottom: 0.3rem;
  // }

  // .profile-intro {
  //   font-size: 1.4rem;
  // }

  // div {
  //   p:first-child {
  //     display: flex;
  //     align-items: center;
  //     gap: 3px;
  //   }
  // }
`;

const H2 = styled.h2`
  .header {
    width: 8rem;
    height: 1.8rem;
  }
`;

const ProfileProductWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ProfileProduct = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 10px;
  gap: 1.5rem;
`;

const ProductListBox = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  @media (min-width: 768px) {
    gap: 3rem;
  }
`;
const ProductBox = styled.ul`
  max-width: 172px;
  margin: 0;

  .itemImg {
    width: 172px;
    height: 110px;
    border-radius: 10px;

    @media (min-width: 768px) {
      width: 191px;
      height: 122px;
    }
  }

  .itemName {
    width: 12rem;
    height: 1.4rem;
    margin: 12px 0 6px 4px;
  }

  .itemDate {
    margin-left: 4px;
    width: 14rem;
    height: 1.1rem;
  }
`;
