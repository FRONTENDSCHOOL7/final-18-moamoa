const JoinAPI = async (userInfo) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user';

  try {
    const response = await fetch(`${reqUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userInfo }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default JoinAPI;
