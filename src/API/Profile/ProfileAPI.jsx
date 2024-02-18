import { authInstance } from '../InstanceAPI';

// 내 프로필 정보 불러오기
export const getMyProfileData = async (token) => {
  try {
    const res = await authInstance.get(`/user/myinfo`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.error('프로필 정보를 가져올 수 없습니다.', error);
  }
};

// 남의 프로필 정보 불러오기
export const getYourProfileData = async (infoUrl) => {
  try {
    const res = await authInstance.get(infoUrl);
    const responseData = res.data;
    return responseData;
  } catch (error) {
    console.error('프로필 정보를 가져올 수 없습니다.', error);
  }
};

export const editProfileData = async (editData) => {
  try {
    await authInstance.put('/user', editData);
  } catch (error) {
    return `*${error.response.data.message}`;
  }
};