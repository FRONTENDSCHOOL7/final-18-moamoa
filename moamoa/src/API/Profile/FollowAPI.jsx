/*
  설명: 팔로우 API
  작성자: 이해지
  최초 작성 날짜: 2023.11.05
  마지막 수정 날까: 2023.11.05
*/

const FollowAPI = async (account, token, reFetchInfo) => {
  const url = `https://api.mandarin.weniv.co.kr/profile/${account}/follow`;
  console.log(`accountname url: ${account}`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    reFetchInfo();
  } catch (error) {
    console.error('팔로우 API오류', error.message);
  }
};
export default FollowAPI;
