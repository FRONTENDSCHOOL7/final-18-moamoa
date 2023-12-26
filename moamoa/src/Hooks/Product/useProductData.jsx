import { useState } from 'react';

export const useProductData = (initialState) => {
  const [productType, setProductType] = useState(initialState.productType);
  const [productName, setProductName] = useState(initialState.productName);
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [endDate, setEndDate] = useState(initialState.endDate);
  const [location, setLocation] = useState(initialState.location);
  const [description, setDescription] = useState(initialState.description);
  const [missingInputMessage, setMissingInputMessage] = useState(initialState.missingInputMessage);

  const [isOpen, setIsOpen] = useState(false);
  const [imgData, setImgData] = useState(initialState.image);
  const [prevImgData, setPrevImgData] = useState('');

  return {
    productType,
    setProductType,
    productName,
    setProductName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,
    description,
    setDescription,
    missingInputMessage,
    setMissingInputMessage,
    isOpen,
    setIsOpen,
    imgData,
    setImgData,
    prevImgData,
    setPrevImgData,
  };
};
