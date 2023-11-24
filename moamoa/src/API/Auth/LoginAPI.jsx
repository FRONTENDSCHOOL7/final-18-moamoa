import axios from 'axios';

const LoginAPI = async (userInput) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user/login';

  try {
    const response = await axios.post(reqUrl, { ...userInput });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};

export default LoginAPI;
