import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useDateValidation from '../../Hooks/Product/useDateValidation';
import { uploadProduct } from '../../API/Product/ProductAPI';
import { editProduct } from '../../API/Product/ProductAPI';

import {
  Form,
  ImgLabel,
  Img,
  Container,
  TitleH2,
  TitleLabel,
  SubContainer,
  Paragraph,
  ButtonTypeBtn,
  SubmitTypeBtn,
} from '../Product/ProductFormStyle';
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
      <Container>
        <TitleH2 id='imageUploadTitle'>이미지 등록</TitleH2>
        <ImgLabel htmlFor='productImg'>
          <Img
            src={imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl}
            alt={'상품 이미지'}
          />
        </ImgLabel>
        <input
          className='a11y-hidden'
          id='productImg'
          type='file'
          accept='image/*'
          onChange={onSelectFile}
          aria-labelledby='imageUploadTitle'
        />
        <Paragraph>* 행사 관련 이미지를 등록해주세요.</Paragraph>
      </Container>
      <Container>
        <TitleH2 id='categoryTitle'>카테고리</TitleH2>
        <SubContainer>
          <ButtonTypeBtn
            type='button'
            onClick={() => setProductType('festival')}
            aria-pressed={product.productType === 'festival'}
            aria-describedby='categoryTitle'
          >
            축제
          </ButtonTypeBtn>
          <ButtonTypeBtn
            type='button'
            onClick={() => setProductType('experience')}
            aria-pressed={product.productType === 'experience'}
            aria-describedby='categoryTitle'
          >
            체험
          </ButtonTypeBtn>
        </SubContainer>
      </Container>
      <Container>
        <TitleLabel htmlFor='eventName'>행사명</TitleLabel>
        <input
          id='eventName'
          type='text'
          placeholder='2~22자 이내여야 합니다.'
          onChange={(e) => setProductName(e.target.value)}
          value={product.productName}
          minLength={2}
          maxLength={22}
          aria-describedby='eventName'
        ></input>
      </Container>
      <Container>
        <TitleLabel id='eventPeriodLabel' htmlFor='eventPeriodStart'>
          행사 기간
        </TitleLabel>
        <SubContainer>
          <input
            type='date'
            id='eventPeriodStart'
            onChange={(e) => setStartDate(e.target.value)}
            value={product.startDate}
            pattern='yyyy-MM-dd'
            max='9999-12-31'
            aria-labelledby='eventPeriodLabel'
          ></input>
          <input
            type='date'
            id='eventPeriodEnd'
            onChange={(e) => setEndDate(e.target.value)}
            value={product.endDate}
            pattern='yyyy-MM-dd'
            max='9999-12-31'
            aria-labelledby='eventPeriodLabel'
          ></input>
        </SubContainer>
        <Paragraph role='alert'>{dateSelectionErrorMsg}</Paragraph>
      </Container>
      <Container>
        <TitleLabel htmlFor='eventLocation'>행사 장소</TitleLabel>
        <input
          type='text'
          placeholder='도로명 주소를 입력해주세요.'
          id='eventLocation'
          value={product.location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          aria-describedby='eventLocation'
        />
      </Container>
      <Container>
        <TitleLabel htmlFor='eventDetail'>상세 설명</TitleLabel>
        <textarea
          id='eventDetail'
          placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
          onChange={(e) => setDescription(e.target.value)}
          value={product.description}
          aria-describedby='eventDetail'
        ></textarea>
      </Container>
      <SubmitTypeBtn type='submit' $isfilled={isFilled}>
        저장
      </SubmitTypeBtn>
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
