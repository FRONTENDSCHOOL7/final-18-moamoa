import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import CommentItem from './CommentItem';


export default function CommentList(postId) {
  const token = useRecoilValue(userTokenAtom)
  const [comments,setComments] = useState("");
  const [addComment, setAddComment] = useState("");

  

  useEffect(() => {
    // 데이터를 비동기적으로 가져오는 함수

    async function getComment() {
      try {
        const res = await axios.get(`https://api.mandarin.weniv.co.kr/post/${postId.postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(res.data.comments);
    } catch (error) {
        // 요청이 실패했을 때 실행되는 코드
        console.error('데이터를 가져오지 못했습니다:', error);
      }
    }

    getComment(); // 데이터를 가져오는 함수 호출
  }, [postId]);

  useEffect(()=>{
    async function postComment() {
      try {
        const res = await axios.post(`https://api.mandarin.weniv.co.kr/post/${postId.postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
          body: addComment,
        });
        const result = await res.json();
        console.log(result)
    } catch (error) {
        // 요청이 실패했을 때 실행되는 코드
        console.error('데이터 전송에 실패했습니다.', error);
      }
    }

    postComment();
  },[addComment])
  
  console.log(comments)

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommnet();
  }

  const handleCommnet = (e) => {
    setAddComment(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div>
      <ul>
        {comments && comments.map((item,index)=>{
            return <CommentItem item={item} key={index}/>;
        })}      
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={addComment} onChange={handleCommnet}/>
        <button>게시</button>
      </form>
    </div>
  )
}
