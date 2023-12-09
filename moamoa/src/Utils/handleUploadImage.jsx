import { uploadImage } from '../API/Image/ImageAPI';

export const handleUploadImage = async (imageFile) => {
  const response = await uploadImage(imageFile);
  const imageUrl = `https://api.mandarin.weniv.co.kr/${response.data.filename}`;
  const imageAlt = response.data.originalname;

  return { imageUrl, imageAlt };
};
