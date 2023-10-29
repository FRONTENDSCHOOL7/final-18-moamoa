const LoginAPI = async (userInput) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user/login';

  try {
    const response = await fetch(reqUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userInput }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default LoginAPI;
