import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function RecommendSkeleton() {
  return (
    <Container>
      <MyFollowingBtn>
        <Skeleton className='btn'/>
      </MyFollowingBtn>
      <FestaInfo>
        <FestaImg>
          <Skeleton className='festaImg'/>
        </FestaImg>
        <FestDesc>
          <Skeleton className='desc'/>
          <Skeleton className='desc'/>
        </FestDesc>
      </FestaInfo>
      <FestaInfo>
        <FestaImg>
          <Skeleton className='festaImg'/>
        </FestaImg>
        <FestDesc>
          <Skeleton className='desc'/>
          <Skeleton className='desc'/>
        </FestDesc>
      </FestaInfo>
      <FestaInfo>
        <FestaImg>
          <Skeleton className='festaImg'/>
        </FestaImg>
        <FestDesc>
          <Skeleton className='desc'/>
          <Skeleton className='desc'/>
        </FestDesc>
      </FestaInfo>
    </Container>
    
  )
}

const Container = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
`

const MyFollowingBtn = styled.button`
  .btn{
    width: 308px;
    height: 45px;
    margin: 0 0 20px 0;
    border-radius: 45px;
  }
`

const FestaInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 16px;
`;

const FestaImg = styled.div`
  .festaImg{
  width: 114px;
  height: 74px;
  border-radius: 10px;
  margin-right: 10px;
  }
`;

const FestDesc = styled.div` 
  .desc{
  width: 9rem;
  height: 0.8rem;
  margin-bottom: 0.5rem; 
  }
`


