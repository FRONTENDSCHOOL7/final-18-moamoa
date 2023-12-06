import _ from 'lodash';
import { uploadImage } from '../API/Image/ImageAPI';

export const handleUploadImage = async (e, setter, path) => {
  const imageFile = e.target.files[0];
  if (!imageFile) {
    return;
  }
  const response = await uploadImage(imageFile);
  const imageUrl = `https://api.mandarin.weniv.co.kr/${response.data.filename}`;

  setter((prevState) => _.set({ ...prevState }, path, imageUrl));
};
