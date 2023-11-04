import axios from 'axios';

export default function PostDeleteAPI(token, postId) {
    const handlePostDelete = async () => {
      try{
      await axios
        .delete(`https://api.mandarin.weniv.co.kr/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        }
      }).then(()=>{
      })}
      catch(err){
        const { status, data } = err.response;
      if (status === 422) {
        console.log(data);
      }
      if (status === 404) {
        //404 이미지 출력
      }
        console.error('게시글 삭제를 실패했습니다.')
      }
    }

  return handlePostDelete
}
