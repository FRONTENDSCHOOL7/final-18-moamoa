import { authInstance } from "../InstanceAPI";

// 내 프로필 정보 불러오기
export const getMyProfileData = async () => {
  const res = await authInstance.get(`user/myinfo`);
  const data = await res.data;
  return data;
};