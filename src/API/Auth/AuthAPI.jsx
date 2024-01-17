import { defaultInstance } from '../InstanceAPI';

// 이메일 검증
export const verifyEmail = async (userEmail) => {
  try {
    const res = await defaultInstance.post(`/user/emailvalid`, userEmail);
    const message = res.data.message;

    if (message === '이미 가입된 이메일 주소 입니다.') {
      return `*${message}`;
    } else if (message === '잘못된 접근입니다.' || !userEmail.user.email) {
      return '*이메일 주소는 필수 입력값입니다.';
    } else {
      return '';
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 && data.message === '잘못된 이메일 형식입니다.') {
        return `*${data.message}`;
      } else {
        console.log(data.message);
        return null;
      }
    }
  }
};

// 계정 검증
export const verifyAccountName = async (userAccountName) => {
  try {
    const res = await defaultInstance.post(`/user/accountnamevalid`, userAccountName);
    const message = res.data.message;
    const pattern = /^[A-Za-z0-9._]+$/;

    if (message === '잘못된 접근입니다.' || userAccountName.user.accountname.length < 2) {
      return '*계정 ID는 2자 이상이어야 합니다.';
    } else if (message === '이미 가입된 계정ID 입니다.') {
      return `*${message}`;
    } else if (!pattern.test(userAccountName.user.accountname)) {
      return '*계정 ID는 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.';
    } else {
      return '';
    }
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
export const signUp = async (userData) => {
  try {
    const res = await defaultInstance.post(`/user`, userData);
    return res.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        return `*${data.message}`;
      } else {
        console.log(data.message);
        return null;
      }
    }
  }
};

// 로그인
export const login = async (userData) => {
  try {
    const res = await defaultInstance.post(`/user/login`, userData);
    return [res.data, null];
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        return [null, data];
      } else {
        console.log(data);
        return null;
      }
    }
  }
};