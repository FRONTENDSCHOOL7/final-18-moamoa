const AccountValidAPI = async (userAccount) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user/accountnamevalid';

  try {
    const response = await fetch(`${reqUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userAccount }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default AccountValidAPI;
