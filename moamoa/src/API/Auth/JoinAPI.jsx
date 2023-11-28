import axios from 'axios';

const JoinAPI = async (userInfo, userType, setErrorMessage) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user';

  try {
    const response = await axios.post(reqUrl, {
      ...userInfo,
      user: {
        ...userInfo.user,
        username:
          userType === 'individual'
            ? `[i]${userInfo.user.username}`
            : `[o]${userInfo.user.username}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        setErrorMessage(`*` + data.message);
      } else {
        console.log(data.message);
      }
    }
  }
};

export default JoinAPI;
