import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import CommentItem from './CommentItem';
import styled from 'styled-components';
import AddCommentBtn from './AddCommentBtn';


export default function Comment(postId) {
  const token = useRecoilValue(userTokenAtom)
  const [comments,setComments] = useState("");
  const [addComment, setAddComment] = useState("");

  useEffect(() => {
    async function getComment() {
      try {
        const res = await axios.get(`https://api.mandarin.weniv.co.kr/post/${postId.postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(res.data.comments);
    } catch (error) {
        console.error('데이터를 가져오지 못했습니다:', error);
      }
    }
    getComment(); 
  }, [postId, addComment, token]);


  const postComment = async (AddData)=>{
  try {
    const res = await axios.post(`https://api.mandarin.weniv.co.kr/post/${postId.postId}/comments`, AddData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
        setComments(res.data.comments);
  } catch (error) {
      console.error('데이터 전송에 실패했습니다.', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(addComment.trim().length === 0){
      return;
    }
    const AddData = {
      comment:{
        content:addComment
      }}
    postComment(AddData)
    setAddComment("")    
    // getComment(); 
  }

  const handleCommnet = (e) => setAddComment(e.target.value)

  {console.log(comments)}

  return (
    <CommentContainer>
      <CommentList>
        {comments && comments.map((item,index)=>{
            return <CommentItem item={item} key={index}/>;
        })}      
      </CommentList>
      <AddComment onSubmit={handleSubmit}>
        {/* <img src="" alt="" /> */}
        <CommentContent type="text" value={addComment} onChange={handleCommnet} placeholder='댓글을 입력해주세요 :)'/>
        <AddCommentBtn addcomment={addComment}/>
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
  padding: 1.8rem 1.6rem 3rem;
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
  translate: -50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentContent = styled.input`
  width: 28rem;
  height: 5rem;
  font-size: 1.4rem;
  &::placeholder{color: #C4C4C4;}
  &:focus{
    outline:none;
  }
`;