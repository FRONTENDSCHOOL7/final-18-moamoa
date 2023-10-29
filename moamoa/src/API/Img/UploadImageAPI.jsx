import axios from 'axios';

export const uploadImage = async (imageFile) => {
  const reqUrl = 'https://api.mandarin.weniv.co.kr/image/uploadfile';

  const form = new FormData();
  form.append('image', imageFile);

  try {
    const res = await axios.post(reqUrl, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const filename = `https://api.mandarin.weniv.co.kr/${res.data.filename}`;
    return filename;
  } catch (error) {
    console.error('이미지 업로드 실패');
  }
};
