const UnFollowAPI = async (account, token) => {
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
  } catch (error) {
    console.error('팔로잉 API오류', error.message);
  }
};

export default UnFollowAPI;
