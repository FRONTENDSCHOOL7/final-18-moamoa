import React from 'react'
import { Link } from 'react-router-dom';

export default function PostCard(post) {

  const baseUrl = `https://api.mandarin.weniv.co.kr/`

  const postprop = post.post;
  const profileImgUrl =`${baseUrl}${postprop.author.image}`;
  const postImgUrl =`${baseUrl}${postprop.image}`;
  const postDetailId = post.post.id;
  console.log(postDetailId)
  const postDetailUrl = `/post/${postDetailId}`

  const inputDate = postprop.createdAt
  const dateset = inputDate.split("").slice(0,10).join("");
  const year = dateset.slice(0,4)
  const month = dateset.slice(5,7)
  const day = dateset.slice(8,10)  
  const outputDate = `${year}년 ${month}월 ${day}일`;

  return (
    <>
      {post && (
        <li>
          <article>
            <Link to={postDetailUrl}>
              {console.log(post.post)}
              <img src={profileImgUrl} alt="사용자프로필"/>
              <p>{postprop.author.username}</p>
              <p>{postprop.author.accountname}</p>
              <button>
                케밥버튼
              </button>
              <p>{post.post.content}</p>
              <img src={postImgUrl} alt="게시글 사진" />
            </Link>
            <p>{outputDate}</p>
            <p>{postprop.heartCount}</p>
            <p>{postprop.commentCount}</p>
          </article>
        </li>
      )}
    </>
      
  )
}
