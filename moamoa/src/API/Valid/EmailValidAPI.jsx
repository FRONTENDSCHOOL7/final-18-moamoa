const EmailValidAPI = async (userEmail) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user/emailvalid';

  try {
    const response = await fetch(`${reqUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userEmail }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default EmailValidAPI;
