import React from 'react';
import PropTypes from 'prop-types';
import { handleUploadImage } from '../../Utils/handleUploadImage.jsx';

import {
  Form,
  ImgLayoutContainer,
  ImageLabel,
  Image,
  LayoutContainer,
  SelectedButton,
  TextInput,
  PeriodInputContainer,
  PeriodInput,
  Textarea,
  StyledErrorMsg,
} from '../../Components/Common/ProductSharedStyle';

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
  missingInputMessage,
}) {
  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) {
      return;
    }
    const imageInfo = await handleUploadImage(imageFile);
    setImgSrc(imageInfo.imageUrl);
  };

  return (
    <Form onSubmit={onSubmit}>
      <ImgLayoutContainer>
        <h2>이미지 등록</h2>
        <ImageLabel htmlFor='upload-file'>
          <Image src={product.imgSrc} alt={product.productName} />
        </ImageLabel>
        <input
          className='a11y-hidden'
          id='upload-file'
          type='file'
          accept='image/*'
          onChange={handleChangeImage}
        ></input>
        <p>* 행사 관련 이미지를 등록해주세요.</p>
      </ImgLayoutContainer>
      <LayoutContainer>
        <h2>카테고리</h2>
        <div>
          <SelectedButton
            type='button'
            onClick={() => setProductType('festival')}
            selected={product.productType === 'festival'}
          >
            축제
          </SelectedButton>
          <SelectedButton
            type='button'
            onClick={() => setProductType('experience')}
            selected={product.productType === 'experience'}
          >
            체험
          </SelectedButton>
        </div>
      </LayoutContainer>
      <LayoutContainer>
        <label htmlFor='event-name'>행사명</label>
        <TextInput
          id='event-name'
          type='text'
          placeholder='2~22자 이내여야 합니다.'
          onChange={(e) => setProductName(e.target.value)}
          value={product.productName}
          minLength={2}
          maxLength={22}
        ></TextInput>
      </LayoutContainer>
      <LayoutContainer>
        <label htmlFor='event-period'>행사 기간</label>
        <PeriodInputContainer>
          <PeriodInput
            type='date'
            id='event-period'
            onChange={(e) => setStartDate(e.target.value)}
            value={product.startDate}
            pattern='yyyy-MM-dd'
            max='9999-12-31'
          ></PeriodInput>
          <PeriodInput
            type='date'
            id='event-period'
            onChange={(e) => setEndDate(e.target.value)}
            value={product.endDate}
            pattern='yyyy-MM-dd'
            max='9999-12-31'
          ></PeriodInput>
        </PeriodInputContainer>
        <StyledErrorMsg>{dateSelectionErrorMsg}</StyledErrorMsg>
      </LayoutContainer>
      <LayoutContainer>
        <label htmlFor='eventLocation'>행사 장소</label>
        <TextInput
          type='text'
          id='eventLocation'
          value={product.location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </LayoutContainer>
      <LayoutContainer>
        <label htmlFor='event-detail'>상세 설명</label>
        <Textarea
          id='event-detail'
          placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
          onChange={(e) => setDescription(e.target.value)}
          value={product.description}
        ></Textarea>
      </LayoutContainer>
      <p> {missingInputMessage}</p>
      <button type='submit'>저장</button>
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
  missingInputMessage: PropTypes.string,
};
