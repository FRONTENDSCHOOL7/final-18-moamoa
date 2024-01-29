import React, { useEffect, useState} from 'react'
import { addComment, getCommentList } from '../../API/Comment/CommnetAPI';
import CommentItem from './CommentItem';
import styled from 'styled-components';
import CommentAddBtn from './CommentAddBtn';
import PropTypes from 'prop-types';

Comment.propTypes = {
  postId: PropTypes.string
}

export default function Comment({postId}) {
  const [commentList,setCommentList] = useState([]);
  const [comment, setComment] = useState("");

  const postComment = async(postId, AddData)=>{
    const res = await addComment(postId,AddData);
    console.log(res.comment);
    setCommentList((prev)=>([res.comment, ...prev]));
    console.log(commentList)
  }

  const handleComment = (e) => setComment(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(comment.trim().length === 0){
      return;
    }
    const AddData = {
      comment:{
        content:comment
      }}
    postComment(postId, AddData) 
    setComment("")   
  }
    
  useEffect(()=>{
    const getcommentData = async(postId) => {
      const getData = await getCommentList(postId);
      setCommentList(getData.comments);
    }
    getcommentData(postId)
  },[postId])

  return (
    <CommentContainer>
      <CommentList>
        {commentList && commentList.map((item,index)=>{
            return <CommentItem item={item} key={index}/>;
        })}      
      </CommentList>
      <AddCommentCont>
        <AddComment onSubmit={handleSubmit}>
          <CommentContent type="text" value={comment} onChange={handleComment} placeholder='댓글을 입력해주세요 :)'/>
          <CommentAddBtn addcomment={comment}/>
        </AddComment>
      </AddCommentCont>
    </CommentContainer>
  )
}

const CommentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9e4;
  @media (min-width: 768px) {
    background-color: #fff;
  }
`;

const CommentList = styled.ul`
  border-top: 1px solid #dbdbdb;
  margin: auto;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 1.8rem 1.6rem 50rem;  
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
    padding-bottom: 100px;
  }
`;
const AddCommentCont = styled.div`
  @media (min-width: 768px) {
    width: 100%;
    height: 6rem;
    border-top: 1px solid #dbdbdb;
    margin: 0 0 0 60px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    background-color: #fff;
  }
  @media (min-width: 1200px) {
    margin-left: 120px;
  }
`

const AddComment = styled.form`
  box-sizing: border-box;
  width: 100%;
  max-width: 39rem;
  height: 6rem;
  background-color: #fff;
  border-top: 1px solid #dbdbdb;
  margin: auto;
  padding: 0 2rem;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    max-width: 480px;
    border: none;
  }
  @media (min-width: 1200px) {
    max-width: 600px;
  }
`;

const CommentContent = styled.input`
  width: 83%;
  height: 4rem;
  font-size: 1.4rem;
    padding-left: 0.5rem;
  &::placeholder{
    color: #767676;
  }
  &:focus{
    outline: 1px solid #dbdbdb;
  }
`;