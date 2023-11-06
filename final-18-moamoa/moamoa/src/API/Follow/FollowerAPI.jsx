import axios from 'axios';

export async function FollowerAPI(token, accountname) {
  const response = await axios.get(
    `https://api.mandarin.weniv.co.kr/profile/${accountname}/follower`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  // 요청이 성공했을 때 데이터 반환
  return response.data;
}
