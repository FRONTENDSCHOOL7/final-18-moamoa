import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ProductAtom } from '../../Pages/Product/ProductList';
import backgroundMoamoa from '../../Assets/images/backgroundMoamoa.png';
import { Link } from 'react-router-dom';
import ProductImgBox from '../../Components/Common/ProductImgBox';
import TopNavigation from '../../Components/Product/TopNavigation';
import { festivalActiveState, experienceActiveState } from '../../Recoil/ProductTypeStateAtom';

function formatEventDate(dateString) {
  const startYear = dateString.slice(2, 4);
  const startMonth = dateString.slice(4, 6);
  const startDay = dateString.slice(6, 8);
  const endYear = dateString.slice(10, 12);
  const endMonth = dateString.slice(12, 14);
  const endDay = dateString.slice(14, 16);

  return `행사기간: ${startYear}.${startMonth}.${startDay} ~ ${endYear}.${endMonth}.${endDay}`;
}

export default function ProductBundle() {
  const [product] = useRecoilState(ProductAtom);
  const [festivalActive, experienceActive] = useRecoilState(
    festivalActiveState,
    experienceActiveState,
  );
  const filterActive = (item) => {
    if (festivalActive && item.itemName.includes('[f]')) {
      return true;
    }
    if (!festivalActive && experienceActive && item.itemName.includes('[e]')) {
      return true;
    }
    return false;
  };
  const filteredProducts = product.filter(filterActive);
  return (
    <>
      <TopNavigation />
      <ProductContainer>
        {filteredProducts.map((item, index) => (
          <ProductBox key={index}>
            <Link to={`/product/detail/${item._id}`} key={index}>
              <ProductImgBox src={item.itemImage} />
            </Link>
            <p className='itemName'>{item.itemName.replace('[f]', '').replace('[e]', '')}</p>
            <p className='itemDate'>{formatEventDate(item.price.toString())}</p>
          </ProductBox>
        ))}
      </ProductContainer>
    </>
  );
}
const ProductContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  flex: 1;
  padding-bottom: 150px;
  background-image: url(${backgroundMoamoa});
  background-repeat: no-repeat;
  background-position: 110% 91%;
  background-position: bottom 8rem right 0px;
  grid-template-rows: 160px;
`;
const ProductBox = styled.div`
  max-width: 172px;
  margin: 0 auto;

  .itemName {
    font-size: 14px;
    margin: 12px 0 6px 4px;
    font-weight: 500;
  }
  .itemDate {
    margin-left: 4px;
    color: #797979;
    font-size: 11px;
    font-weight: 400;
  }
`;
