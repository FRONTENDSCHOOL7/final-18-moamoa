import React from 'react'
import styled from 'styled-components';
import { productPeriod } from '../../Pages/Product/period';
import PropTypes from 'prop-types';
import FestaMap from './FestaMap';

ProductContents.propTypes = {
  productData: PropTypes.object
}


export default function ProductContents({productData}) {

  const placeIndex = productData?.link.indexOf("+[l]")

  return (
    <>
      <FestivalImg src={productData.itemImage || ''} alt='행사' />
      <InfoContainer>
        <FestivalTitle>
          {productData.itemName.slice(3) || '행사명을 조회할 수 없습니다.'}
        </FestivalTitle>
        <FestivalInfo>행사 소개</FestivalInfo>
        <FestivalDesc>
          {productData?.link.slice(0,placeIndex) || '행사 상세 설명을 조회할 수 없습니다.'}
        </FestivalDesc>
        <FestivalInfo>행사 기간</FestivalInfo>
        <FestivalDesc>
          {productData ? productPeriod(productData): '행사 기간을 조회할 수 없습니다.'}
        </FestivalDesc>
        <FestivalInfo>행사 장소</FestivalInfo>
        <FestaMap festaName={productData?.link.slice(placeIndex+4)}/>
      </InfoContainer>
    </>
  )
}

const FestivalImg = styled.img`
  width: 39rem;
  height: 27rem;
  aspect-ratio: 39/27;
  object-fit: cover;
  @media (min-width: 768px) {
    width: 480px;
    height: 290px;
    border-radius: 10px;
  }
`;
const InfoContainer = styled.div`
  padding: 0 1.6rem;
  @media (min-width: 768px) {
    padding: 0;
  }
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

