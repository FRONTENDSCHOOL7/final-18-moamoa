import { useState } from 'react';

export const useProductData = (initialState) => {
  const [productType, setProductType] = useState(initialState.productType);
  const [productName, setProductName] = useState(initialState.productName);
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [endDate, setEndDate] = useState(initialState.endDate);
  const [location, setLocation] = useState(initialState.location);
  const [description, setDescription] = useState(initialState.description);

  const [isOpen, setIsOpen] = useState(false);
  const [imgData, setImgData] = useState(initialState.image);
  const [prevImgData, setPrevImgData] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    isOpen,
    setIsOpen,
    imgData,
    setImgData,
    prevImgData,
    setPrevImgData,
    showModal,
    setShowModal,
    editMode,
    setEditMode,
  };
};
