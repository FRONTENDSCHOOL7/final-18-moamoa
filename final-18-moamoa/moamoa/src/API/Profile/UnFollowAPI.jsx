/*
  설명: 언팔로우 API
  작성자: 이해지
  최초 작성 날짜: 2023.11.05
  마지막 수정 날까: 2023.11.05
*/

const UnFollowAPI = async (account, token, reFetchInfo) => {
  const url = `https://api.mandarin.weniv.co.kr/profile/${account}/unfollow`;
  console.log(`accountname url: ${account}`);
  console.log(`accountname token: ${token}`);

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    reFetchInfo();
  } catch (error) {
    console.error('팔로잉 API오류', error.message);
  }
};

export default UnFollowAPI;
