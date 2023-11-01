import React from 'react'
import CommentMoreBtn from './CommentMoreBtn'
import TimeCalc from './timecalc';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function CommentItem(item) {
  const created = TimeCalc(item.item.createdAt)
  const comment = item.item
  return (
    <li>
      <Comment>
        <CommentUser>
          <Link to={`/profile/${comment.author.accountname}`}>
            <UserInfo>
              <FrofilImg src={comment.author.image} alt="사용자 프로필" />
              <UserName>{comment.author.username.slice(3)}</UserName>
              <Time>{created}</Time>
            </UserInfo>
          </Link>
          <CommentMoreBtn accountname={comment.author.accountname} commentid={comment.id}/>
        </CommentUser>
        <CommentDesc>{comment.content}</CommentDesc>
      </Comment>
    </li>
  )
}

const Comment = styled.div`
  margin-bottom: 2rem;
`

const CommentUser = styled.div`
  display: flex;
  margin-bottom: 0.4rem;
  justify-content: space-between;
  align-items: center;

`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

const FrofilImg = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 100%;
  object-fit: cover;
`;

const UserName = styled.p`
  margin-left: 1.2rem;
  font-size: 1.4rem;
`;

const Time = styled.p`
  margin-left: 1.2rem;
  color: #767676;
  font-size: 1rem;
`;

const CommentDesc = styled.p`
  margin-left: 4.8rem;
  font-size: 1.4rem;
  color: #333;
`;