import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '../../Components/Product/ProductForm';
import { useProductData } from '../../Hooks/Product/useProductData';
import { getProductDetail, editProduct } from '../../API/Product/ProductAPI';
import useDateValidation from '../../Hooks/Product/useDateValidation';
import { Container } from '../../Components/Common/Container';
import DefaultImg from '../../Assets/images/img-product-default.png';
import { HeaderSubmitProduct } from '../../Components/Common/HeaderComponents';

const ProductEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.product_id;

  const initialState = {
    productType: '',
    productName: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    missingInputMessage: '',
    image: {
      imageUrl: DefaultImg,
      croppedImageUrl: null,
    },
  };

  const {
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
  } = useProductData(initialState);

  const onCancel = () => {
    setImgData((prevImage) => ({
      ...prevImage,
      imageUrl: prevImgData, // 이전 이미지로 설정
    }));
    setIsOpen(false);
  };

  const setCroppedImageFor = (crop, zoom, croppedImageUrl) => {
    const newImage = { ...imgData, croppedImageUrl, crop, zoom };

    setImgData(newImage);

    setIsOpen(false);
  };

  const onSelectFile = (e) => {
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
      setIsOpen(true);
    }
  };

  const { progressPeriod, dateSelectionErrorMsg } = useDateValidation(startDate, endDate);

  const getProductData = (data) => {
    const period = data.product.price.toString();

    console.log(data);

    setProductType(data.product.itemName.slice(0, 3) === '[f]' ? 'festival' : 'experience');
    setProductName(data.product.itemName.slice(3));
    setImgData((prevImg) => ({ ...prevImg, imageUrl: data.product.itemImage }));
    setDescription(data.product.link.split('+[l]')[0]);
    setLocation(data.product.link.split('+[l]')[1]);
    setStartDate(`${period.slice(0, 4)}-${period.slice(4, 6)}-${period.slice(6, 8)}`);
    setEndDate(`${period.slice(8, 12)}-${period.slice(12, 14)}-${period.slice(14, 16)}`);
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      await getProductDetail(productId, getProductData);
    };

    fetchProductInfo();
  }, []);

  const productData = {
    product: {
      itemName: productType === 'festival' ? `[f]${productName}` : `[e]${productName}`,
      price: progressPeriod,
      link: `${description}+[l]${location}`,
      itemImage: imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl,
    },
  };

  const validationChecks = () => {
    if (
      productName.length < 2 ||
      !startDate ||
      !endDate ||
      !location ||
      !description ||
      !productType ||
      startDate > endDate
    ) {
      setMissingInputMessage('입력하지 않은 정보가 있습니다. 다시 확인해주세요.');
      return false;
    } else {
      setMissingInputMessage('');
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validationChecks()) {
      return;
    }

    await editProduct(productId, productData);
    navigate('/product/list');
  };

  return (
    <Container>
      <HeaderSubmitProduct />
      <h1 className='a11y-hidden'>상품 수정 페이지</h1>
      <ProductForm
        product={{ productName, productType, startDate, endDate, location, description }}
        setProductType={setProductType}
        setProductName={setProductName}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        dateSelectionErrorMsg={dateSelectionErrorMsg}
        setLocation={setLocation}
        setDescription={setDescription}
        onSubmit={onSubmit}
        missingInputMessage={missingInputMessage}
        imgData={imgData}
        onCancel={onCancel}
        onSelectFile={onSelectFile}
        setCroppedImageFor={setCroppedImageFor}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default ProductEdit;
