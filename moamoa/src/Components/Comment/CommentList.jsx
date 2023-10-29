import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import CommentItem from './CommentItem';

export default function CommentList(postId) {
  const token = useRecoilValue(userTokenAtom)
  const [comments,setComments] = useState("");

  useEffect(() => {
    // 데이터를 비동기적으로 가져오는 함수

    async function axiosData() {
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

    axiosData(); // 데이터를 가져오는 함수 호출
  }, [postId]);
  
  console.log(comments)

  return (
    <div>
      <ul>
        {comments && comments.map((item,index)=>{
            return <CommentItem item={item} key={index}/>;
        })}      
      </ul>
      <div>
        <input type="text" />
        <button>게시</button>
      </div>
    </div>
  )
}
