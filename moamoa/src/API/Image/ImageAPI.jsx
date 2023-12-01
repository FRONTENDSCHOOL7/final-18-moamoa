import { imageInstance } from '../InstanceAPI';

// 한 개의 이미지(프로필, 상품) 업로드
export const uploadImage = async (imageFile) => {
  const form = new FormData();
  form.append('image', imageFile);

  try {
    const res = await imageInstance.post('/image/uploadfile', form);
    return res;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};
