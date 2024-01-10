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

    console.log(postId);
    
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
      <AddComment onSubmit={handleSubmit}>
        <CommentContent type="text" value={comment} onChange={handleComment} placeholder='댓글을 입력해주세요 :)'/>
        <CommentAddBtn addcomment={comment}/>
      </AddComment>
    </CommentContainer>
  )
}

const CommentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9e4;
`;

const CommentList = styled.ul`
  border-top: 1px solid #dbdbdb;
  max-width: 39rem;
  margin: auto;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 1.8rem 1.6rem 60rem;  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AddComment = styled.form`
  box-sizing: border-box;
  width: 100%;
  max-width: 39rem;
  height: 6rem;
  background-color: white;
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
`;

const CommentContent = styled.input`
  width: 28rem;
  height: 5rem;
  font-size: 1.4rem;
  &::placeholder{color: #767676;}
  &:focus{
    outline:none;
  }
`;