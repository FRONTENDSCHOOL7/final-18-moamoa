/*
  설명: 팔로우 API
  작성자: 이해지
  최초 작성 날짜: 2023.11.05
  마지막 수정 날까: 2023.12.15
*/
import { authInstance } from '../InstanceAPI';

// 팔로우
export const followAPI = async (account) => {
  try {
    await authInstance.post(`/profile/${account}/follow`);
  } catch (error) {
    console.error('팔로우 API오류', error.message);
  }
};

// 언팔로우
export const unFollowAPI = async (account) => {
  try {
    await authInstance.delete(`/profile/${account}/unfollow`);
  } catch (error) {
    console.error('언팔로우 API오류', error.message);
  }
};

export async function FollowerPageAPI(token, accountname) {
  const response = await authInstance.get(`profile/${accountname}/follower`);

  return response.data;
}
export async function FollowingPageAPI(token, accountname) {
  const response = await authInstance.get(`profile/${accountname}/following`);
  return response.data;
}
