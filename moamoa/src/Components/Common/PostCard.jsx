import React from 'react'

export default function PostCard(post) {

  const postprop = post.post;

  const profileImgUrl =`https://api.mandarin.weniv.co.kr/${postprop.author.image}`;

  const postImgUrl =`https://api.mandarin.weniv.co.kr/${postprop.image}`;

  return (
    <>
      {post && (
        <li>
          <article>
            {console.log(post.post)}
            <img src={profileImgUrl} alt="사용자프로필"/>
            <p>{postprop.author.username}</p>
            <p>{postprop.author.accountname}</p>
            <button>
              케밥버튼
            </button>
            <p>{post.post.content}</p>
            <img src={postImgUrl} alt="게시글 사진" />
            <p>{postprop.createdAt}</p>
            <p>{postprop.heartCount}</p>
            <p>{postprop.commentCount}</p>
          </article>
        </li>
      )};
    </>
      
  )
}
