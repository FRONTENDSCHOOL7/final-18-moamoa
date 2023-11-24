import axios from 'axios';

const EmailValidAPI = async (userEmail) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/user/emailvalid';

  try {
    const response = await axios.post(reqUrl, { ...userEmail });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default EmailValidAPI;
