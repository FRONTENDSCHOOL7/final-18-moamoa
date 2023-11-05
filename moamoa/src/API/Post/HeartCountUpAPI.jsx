import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';

const HeartCountUpAPI = (postId)  => {

  const token = useRecoilValue(userTokenAtom);

  const heartPost = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/heart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
      
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return heartPost;

};

export default HeartCountUpAPI