import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';

const HeartCountDownAPI = (postId)  => {

  const token = useRecoilValue(userTokenAtom);

  const unheartPost = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/unheart`, {
        method: 'DELETE',
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

  return unheartPost;

};


export default HeartCountDownAPI