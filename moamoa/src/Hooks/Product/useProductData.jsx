import { useState } from 'react';

export const useProductData = (initialState) => {
  const [imgSrc, setImgSrc] = useState(initialState.imgSrc);
  const [productType, setProductType] = useState(initialState.productType);
  const [productName, setProductName] = useState(initialState.productName);
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [endDate, setEndDate] = useState(initialState.endDate);
  const [location, setLocation] = useState(initialState.location);
  const [description, setDescription] = useState(initialState.description);
  const [missingInputMessage, setMissingInputMessage] = useState(initialState.missingInputMessage);

  return {
    imgSrc,
    setImgSrc,
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
  };
};
