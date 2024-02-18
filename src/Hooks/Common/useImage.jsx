import { useState } from 'react';

export const useImage = (initialImg) => {
  const [showImgModal, setShowImgModal] = useState(false);
  const [imgData, setImgData] = useState({
    imageUrl: initialImg,
    croppedImageUrl: null,
  });
  const [prevImgData, setPrevImgData] = useState('');

  const resizeImage = async (url, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let newWidth, newHeight;

        if (img.width > maxWidth || img.height > maxHeight) {
          const aspectRatio = img.width / img.height;

          if (aspectRatio > 1) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
          } else {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
          }
        } else {
          newWidth = img.width;
          newHeight = img.height;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        resolve(canvas.toDataURL('image/jpeg'));
      };

      img.src = url;
    });
  };

  const onSelectFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', async () => {
        setPrevImgData(imgData.imageUrl); // 이전 이미지 저장

        const resizedImageUrl = await resizeImage(reader.result, 700, 500);

        setImgData((prevImage) => ({
          ...prevImage,
          imageUrl: resizedImageUrl || '', // 새로운 이미지 설정
        }));
      });
      reader.readAsDataURL(e.target.files[0]);
      setShowImgModal(true);
    }
  }

  // 모달에서 닫기창 클릭 시 처리
  const onCancel = () => {
    setImgData((prevImage) => ({
      ...prevImage,
      imageUrl: prevImgData, // 이전 이미지로 설정
    }));
    setShowImgModal(false);
  };

  // 모달에서 크롭한 이미지 저장
  const setCroppedImageFor = (crop, zoom, croppedImageUrl) => {
    const newImage = { ...imgData, croppedImageUrl, crop, zoom };
    setImgData(newImage);
    setShowImgModal(false);
  };

  return { imgData, setImgData, showImgModal, onSelectFile, onCancel, setCroppedImageFor };
};
