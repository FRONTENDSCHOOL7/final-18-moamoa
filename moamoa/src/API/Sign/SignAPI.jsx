import { defaultInstance } from '../InstanceAPI';

// 이메일 검증
export const verifyEmail = async (userEmail) => {
  try {
    const res = await defaultInstance.post(`/user/emailvalid`, userEmail);
    return res.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};

// 회원가입
export const join = async (joinData, setErrorMessage) => {
  try {
    const res = await defaultInstance.post(`/user`, joinData);
    return res.data;
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

// 로그인
export const login = async (userData) => {
  try {
    const res = await defaultInstance.post(`/user/login`, userData);
    return res.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};
