import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export const useImage = (initialImg) => {
  const [showImgModal, setShowImgModal] = useState(false);
  const [imgData, setImgData] = useState({
    imageUrl: initialImg,
    croppedImageUrl: null,
  });
  const [prevImgData, setPrevImgData] = useState('');
  // const [compImg, setCompImg] = useState('');

  const onSelectFile = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPrevImgData(imgData.imageUrl); // 이전 이미지 저장
        setImgData((prevImage) => ({
          ...prevImage,
          imageUrl: reader.result?.toString() || '', // 새로운 이미지 설정
        }));
      });

      reader.readAsDataURL(e.target.files[0]);
      const compFile = e.target.files[0];
      const compOptions = {
        // maxSizeMB: 0.5,
        maxWidthOrHeight: 650,
        useWebWorker: true
      };
      const compressedFile =  await imageCompression(compFile, compOptions);
      // setCompImg(compressedFile);
      const promise = imageCompression(compressedFile);
      await promise.then((result) => {
        setImgData(result);
        reader.readAsDataURL(result);
        setShowImgModal(true);
      })
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