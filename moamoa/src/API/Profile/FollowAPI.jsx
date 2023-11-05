const FollowAPI = async (account, token) => {
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
  } catch (error) {
    console.error('팔로우 API오류', error.message);
  }
};
export default FollowAPI;
