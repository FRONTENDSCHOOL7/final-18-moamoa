import React from 'react';
import PropTypes from 'prop-types';
import { handleUploadImage } from '../../Utils/handleUploadImage.jsx';
import {
  Form,
  ImgLayoutContainer,
  ImageLabel,
  Image,
  LayoutContainer,
  Button,
  TextInput,
  DateInput,
  // SubmitErrorMsg,
  SubmitBtn,
} from '../../Components/Common/ProductFormStyle';

export function ProductForm({
  product,
  setImgSrc,
  setProductType,
  setProductName,
  setStartDate,
  setEndDate,
  dateSelectionErrorMsg,
  setLocation,
  setDescription,
  onSubmit,
  // missingInputMessage,
}) {
  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) {
      return;
    }
    const imageInfo = await handleUploadImage(imageFile);
    setImgSrc(imageInfo.imageUrl);
  };

  const isFilled =
    product.imgSrc !== '' &&
    product.productName !== '' &&
    product.productType !== '' &&
    product.startDate !== '' &&
    product.endDate !== '' &&
    product.location !== '' &&
    product.description;

  return (
    <Form onSubmit={onSubmit}>
      <ImgLayoutContainer>
        <h2 id='imageUploadTitle'>이미지 등록</h2>

        <ImageLabel htmlFor='uploadFile'>
          <Image src={product.imgSrc} alt={product.productName} />
        </ImageLabel>

        <input
          className='hidden-but-accessible'
          id='uploadFile'
          type='file'
          accept='image/*'
          onChange={handleChangeImage}
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
      {/* <SubmitErrorMsg role='alert' className='error-msg'>
        {missingInputMessage}
      </SubmitErrorMsg> */}
      <SubmitBtn type='submit' $isfilled={isFilled}>
        저장
      </SubmitBtn>
    </Form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setImgSrc: PropTypes.func.isRequired,
  setProductType: PropTypes.func.isRequired,
  setProductName: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  dateSelectionErrorMsg: PropTypes.string,
  setLocation: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  // missingInputMessage: PropTypes.string,
};
