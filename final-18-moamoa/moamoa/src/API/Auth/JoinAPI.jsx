const JoinAPI = async (userInfo, userType) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user';

  try {
    const response = await fetch(`${reqUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userInfo,
        user: {
          ...userInfo.user,
          username:
            userType === 'individual'
              ? `[i]${userInfo.user.username}`
              : `[o]${userInfo.user.username}`,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
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

export default JoinAPI;
