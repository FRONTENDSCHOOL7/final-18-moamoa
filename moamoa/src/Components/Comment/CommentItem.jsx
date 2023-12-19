import React from 'react'
import CommentMoreBtn from './CommentMoreBtn'
import TimeCalc from './timecalc';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserTypeCheck from '../../Assets/icons/icon-usertype-check.svg';

export default function CommentItem(item) {
  const created = TimeCalc(item.item.createdAt)
  const comment = item.item
  const commentAuthor = comment.author

  return (
    <li>
      <Comment>
        <CommentUser>
          <Link to={`/profile/${commentAuthor.accountname}`}>
            <UserInfo>
              <FrofilImg src={commentAuthor.image} alt="사용자 프로필" />

                <OfficialCont>
              <UserName>{commentAuthor.username.slice(3)}</UserName>
              {commentAuthor.username.slice(0,3) === '[o]'?                
                  <UserCheck src={UserTypeCheck} alt=''/> : null
                  }
                </OfficialCont>
              <Time>{created}</Time>
            </UserInfo>
          </Link>
          <CommentMoreBtn accountname={commentAuthor.accountname} commentid={comment.id}/>
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
const OfficialCont = styled.div`
  display: flex;
  align-items: center;
  vertical-align: top;
`;

const UserCheck = styled.img`
  padding-left: 0.3rem;
  width: 1.2rem
`;