import React from 'react'
import { productPeriod } from '../../Pages/Product/period';
import PropTypes from 'prop-types';
import FestaMap from './FestaMap';import { FestivalImg, InfoContainer, FestivalTitle, FestivalInfo, FestivalDesc } from '../../Pages/Product/ProductDetailStyle';

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



