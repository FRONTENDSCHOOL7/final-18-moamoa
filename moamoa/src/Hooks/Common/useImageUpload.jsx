import { useState } from 'react';
import { uploadImage } from '../../API/Image/ImageAPI';

const useImageUpload = (key, defaultImg, setTargetData) => {
  const [imgSrc, setImgSrc] = useState({
    profile: {
      url: defaultImg,
      alt: '',
    },
  });

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) {
      return;
    }

    const response = await uploadImage(imageFile);

    setTargetData((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        image: `https://api.mandarin.weniv.co.kr/${response.data.filename}`,
      },
    }));

    setImgSrc({
      ...imgSrc,
      profile: {
        ...imgSrc.profile,
        url: `https://api.mandarin.weniv.co.kr/${response.data.filename}`,
        alt: response.data.originalname,
      },
    });
  };

  return [imgSrc, handleChangeImage];
};

export { useImageUpload };
