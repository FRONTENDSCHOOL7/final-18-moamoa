import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import CommentItem from './CommentItem';
import styled from 'styled-components';


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
  }, [postId, token]);


  const postComment = async (AddData)=>{
  try {
    await axios.post(`https://api.mandarin.weniv.co.kr/post/${postId.postId}/comments`, AddData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
  }

  const handleCommnet = (e) => setAddComment(e.target.value)

  return (
    <CommentContainer>
      <CommentList>
        {comments && comments.map((item,index)=>{
            return <CommentItem item={item} key={index}/>;
        })}      
      </CommentList>
      <AddComment onSubmit={handleSubmit}>
        <img src="" alt="" />
        <input type="text" value={addComment} onChange={handleCommnet} placeholder='댓글 입력하기...'/>
        <AddCommentBtn>게시</AddCommentBtn>
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
  height: 100%;
  margin: auto;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 1.8rem 1.6rem;
`;

const AddComment = styled.form`
  width: 100%;
  max-width: 39rem;
  height: 6rem;
  background-color: white;
  border-top: 1px solid #dbdbdb;
  margin: auto;
  position: fixed;
  bottom: 0;
  left: 50%;
  translate: -50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddCommentBtn = styled.button`
  width: 4.6rem;
  height: 4rem;
  border-radius: 1rem;
  border: 1px solid #C4C4C4;

`;