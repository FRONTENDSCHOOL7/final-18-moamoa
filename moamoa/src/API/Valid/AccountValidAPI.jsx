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
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};

export default AccountValidAPI;
