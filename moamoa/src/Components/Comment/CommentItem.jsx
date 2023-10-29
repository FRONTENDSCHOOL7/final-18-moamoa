import React from 'react'

export default function CommentItem(item) {

  console.log(item)
  return (
    <li>
      <img src="" alt="사용자 프로필" />
      <p>{item.item.author.username}</p>
      <p>작성시간(몇분 지났는지...)</p>
      <button>더보기 버튼</button>
      <p>{item.content}</p>
    </li>
  )
}
