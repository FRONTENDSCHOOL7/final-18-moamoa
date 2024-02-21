import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function PostItemSkeleton() {
  return (
    <>
      <UserInfo>
        <ProfileImg>
          <Skeleton className='profileImg'/>
        </ProfileImg>
        <UserName>
          <Skeleton className='userInfo'/>
          <Skeleton className='userInfo'/>
        </UserName>
        <MoreBtn>
          <Skeleton className='more'/>
        </MoreBtn>
      </UserInfo>
      <PostContents>
        <Skeleton className='postDesc'/>
        <Skeleton className='postImg'/>
      </PostContents>
      <PostFooter>
          <CreatedDate>
            <Skeleton className='date'/>
          </CreatedDate>
          <Button>
            <Skeleton className='btn'/>
            <Skeleton className='count'/>
            <Skeleton className='btn'/>
            <Skeleton className='count'/>
          </Button>
      </PostFooter>
      
    </>
    
  )
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const ProfileImg = styled.div`
  
  .profileImg{
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 100%;
  margin-right: 0.8rem;
  }
`;

const UserName = styled.div` 
  .userInfo{
  width: 7rem;
  height: 0.8rem;
  margin-bottom: 0.5rem; 
  }
`

const PostContents =styled.div`
  .postDesc{
    width: 100%;
    height: 2rem;
    margin: 1.2rem 0;
    border-radius: 0.6rem;
  }
  .postImg{
    overflow: hidden;
    width: 100%;
    height: 22.8rem;
    border-radius: 1rem;
    @media (min-width: 768px) {
    width: 480px;
    height: 290px;
  }
  }
`

const MoreBtn = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  .more{
  width: 1.8rem;
  height: 1.8rem;
  }
`

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0.8rem 0;
`

const CreatedDate = styled.div`
  .date{
  width: 8rem;
  height: 1rem;
  }
`
const Button = styled.div`
  display: flex;
  align-items: center;
  .btn{
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 1rem;
  }
  .count{
    width: 1rem;
    height: 1rem;
    margin-left: 0.8rem;
  }
`