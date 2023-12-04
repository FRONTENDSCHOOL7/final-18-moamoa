import React from 'react'
import styled from 'styled-components';
import { productPeriod } from '../../Pages/Product/period';
import PropTypes from 'prop-types';

ProductContents.propTypes = {
  productData: PropTypes.object
}


export default function ProductContents({productData}) {
  return (
    <>
      <FestivalImg src={productData.itemImage || ''} alt='행사' />
      <InfoContainer>
        <FestivalTitle>
          {productData.itemName.slice(3) || '행사명을 조회할 수 없습니다.'}
        </FestivalTitle>
        <FestivalInfo>행사 소개</FestivalInfo>
        <FestivalDesc>
          {productData?.link || '행사 상세 설명을 조회할 수 없습니다.'}
        </FestivalDesc>
        <FestivalInfo>행사 기간</FestivalInfo>
        <FestivalDesc>
          {productData ? productPeriod(productData): '행사 기간을 조회할 수 없습니다.'}
        </FestivalDesc>
      </InfoContainer>
    </>
  )
}

const FestivalImg = styled.img`
  width: 39rem;
  height: 27rem;
  aspect-ratio: 39/27;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  padding: 0 1.6rem;
`;
const FestivalTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 1.6rem 1.8rem;
`;

const FestivalInfo = styled.h4`
  font-size: 1.4rem;
  font-weight: bold;
  padding: 1.6rem 1.8rem 0.6rem;
  border-top: 1px solid #dbdbdb;
`;

const FestivalDesc = styled.p`
  font-size: 1.4rem;
  padding: 0 1.8rem;
  margin-bottom: 1.6rem;
  line-height: 2rem;
  color: #767676;
`;

