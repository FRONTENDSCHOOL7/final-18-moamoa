import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useDateValidation from '../../Hooks/Product/useDateValidation';
import { uploadProduct } from '../../API/Product/ProductAPI';
import { editProduct } from '../../API/Product/ProductAPI';

import {
  Form,
  ImgLayoutContainer,
  ImageLabel,
  Image,
  LayoutContainer,
  Button,
  TextInput,
  DateInput,
  SubmitBtn,
} from '../../Components/Common/ProductFormStyle';
import ImageCropModal from '../Modal/ImageCropModal';
import RequiredInputModal from '../Modal/RequiredInputModal';

export function ProductForm({
  product,
  setProductType,
  setProductName,
  setStartDate,
  setEndDate,
  setLocation,
  setDescription,
  showModal,
  setShowModal,
  imgData,
  onCancel,
  onSelectFile,
  setCroppedImageFor,
  isOpen,
  editMode,
  productId,
}) {
  const navigate = useNavigate();

  const { progressPeriod, dateSelectionErrorMsg } = useDateValidation(
    product.startDate,
    product.endDate,
  );

  const productData = {
    product: {
      itemName:
        product.productType === 'festival'
          ? `[f]${product.productName}`
          : `[e]${product.productName}`,
      price: progressPeriod,
      link: `${product.description}+[l]${product.location}`,
      itemImage: imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl,
    },
  };

  const validationChecks = () => {
    if (
      product.productName.length < 2 ||
      !product.startDate ||
      !product.endDate ||
      !product.location ||
      !product.description ||
      !product.productType ||
      product.startDate > product.endDate
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validationChecks()) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
      return;
    }

    if (!editMode) {
      await uploadProduct(productData);
    } else if (editMode) {
      await editProduct(productId, productData);
    }

    navigate('/product/list');
  };

  const isFilled =
    product.productName !== '' &&
    product.productType !== '' &&
    product.startDate !== '' &&
    product.endDate !== '' &&
    product.location !== '' &&
    product.description;

  return (
    <Form onSubmit={onSubmit}>
      {isOpen && (
        <ImageCropModal
          imageUrl={imgData.imageUrl}
          cropInit={imgData.crop}
          zoomInit={imgData.zoom}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          cropShape='rect'
          aspect={358 / 228}
        />
      )}

      <ImgLayoutContainer>
        <h2 id='imageUploadTitle'>이미지 등록</h2>

        <ImageLabel htmlFor='productImg'>
          <Image
            src={imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl}
            alt={'상품 이미지'}
          />
        </ImageLabel>

        <input
          className='hidden-but-accessible'
          id='productImg'
          type='file'
          accept='image/*'
          onChange={onSelectFile}
          aria-labelledby='imageUploadTitle'
        />

        <p>* 행사 관련 이미지를 등록해주세요.</p>
      </ImgLayoutContainer>
      <LayoutContainer>
        <h2 id='categoryTitle'>카테고리</h2>
        <div className='category-container'>
          <Button
            type='button'
            onClick={() => setProductType('festival')}
            aria-pressed={product.productType === 'festival'}
            aria-describedby='categoryTitle'
          >
            축제
          </Button>
          <Button
            type='button'
            onClick={() => setProductType('experience')}
            aria-pressed={product.productType === 'experience'}
            aria-describedby='categoryTitle'
          >
            체험
          </Button>
        </div>
      </LayoutContainer>
      <LayoutContainer>
        <label htmlFor='eventName'>행사명</label>
        <TextInput
          id='eventName'
          type='text'
          placeholder='2~22자 이내여야 합니다.'
          onChange={(e) => setProductName(e.target.value)}
          value={product.productName}
          minLength={2}
          maxLength={22}
          aria-describedby='eventName'
        ></TextInput>
      </LayoutContainer>
      <LayoutContainer>
        <label id='eventPeriodLabel' htmlFor='eventPeriodStart'>
          행사 기간
        </label>
        <div className='dateinput-container'>
          <DateInput
            type='date'
            id='eventPeriodStart'
            onChange={(e) => setStartDate(e.target.value)}
            value={product.startDate}
            pattern='yyyy-MM-dd'
            max='9999-12-31'
            aria-labelledby='eventPeriodLabel'
          ></DateInput>
          <DateInput
            type='date'
            id='eventPeriodEnd'
            onChange={(e) => setEndDate(e.target.value)}
            value={product.endDate}
            pattern='yyyy-MM-dd'
            max='9999-12-31'
            aria-labelledby='eventPeriodLabel'
          ></DateInput>
        </div>
        <p role='alert' className='error-msg'>
          {dateSelectionErrorMsg}
        </p>
      </LayoutContainer>
      <LayoutContainer>
        <label htmlFor='eventLocation'>행사 장소</label>
        <TextInput
          type='text'
          placeholder='도로명 주소를 입력해주세요.'
          id='eventLocation'
          value={product.location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          aria-describedby='eventLocation'
        />
      </LayoutContainer>
      <LayoutContainer>
        <label htmlFor='eventDetail'>상세 설명</label>
        <textarea
          id='eventDetail'
          placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
          onChange={(e) => setDescription(e.target.value)}
          value={product.description}
          aria-describedby='eventDetail'
        ></textarea>
      </LayoutContainer>
      <SubmitBtn type='submit' $isfilled={isFilled}>
        저장
      </SubmitBtn>
      {showModal && <RequiredInputModal />}
    </Form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  setProductType: PropTypes.func.isRequired,
  setProductName: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  imgData: PropTypes.any.isRequired,
  selectedImage: PropTypes.any,
  onCancel: PropTypes.any.isRequired,
  onSelectFile: PropTypes.any.isRequired,
  setCroppedImageFor: PropTypes.any.isRequired,
  isOpen: PropTypes.bool,
  editMode: PropTypes.bool,
  productId: PropTypes.string,
};
