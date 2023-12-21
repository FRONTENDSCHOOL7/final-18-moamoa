import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ProductAtom } from '../../Pages/Product/ProductList';
import backgroundMoamoa from '../../Assets/images/backgroundMoamoa.png';
import { Link } from 'react-router-dom';
import { ProductListImgBox } from '../../Components/Common/ProductImgBox';
import TopNavigation from '../../Components/Product/TopNavigation';
import { filterActive } from './filterActive';
import { formatEventStartDate } from './formatEventDate';
import { formatEventEndDate } from './formatEventDate';
import { semanticStartDate } from './formatEventDate';
import { semanticEventEndDate } from './formatEventDate';

export default function ProductBundle() {
  const [product] = useRecoilState(ProductAtom);
  const filteredProducts = product.filter(filterActive);

  return (
    <>
      <TopNavigation />
      <ProductContainer>
        {filteredProducts.map((item, index) => (
          <ProductBox key={index}>
            <Link to={`/product/detail/${item._id}`} key={index}>
              <ProductListImgBox src={item.itemImage} />
            </Link>
            <h2 className='itemName'>{item.itemName.replace('[f]', '').replace('[e]', '')}</h2>
            <time className='itemDate' dateTime={semanticStartDate(item.price.toString())}>
              {formatEventStartDate(item.price.toString())}
            </time>
            <time className='itemDate' dateTime={semanticEventEndDate(item.price.toString())}>
              {formatEventEndDate(item.price.toString())}
            </time>
          </ProductBox>
        ))}
      </ProductContainer>
    </>
  );
}
export const ProductContainer = styled.div`
  max-width: 100%;
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  flex: 1;

  padding-bottom: 150px;
  background-image: url(${backgroundMoamoa});
  background-repeat: no-repeat;
  background-position: 110% 91%;
  background-position: bottom 8rem right 0px;
`;
export const ProductBox = styled.div`
  /* max-width: 190px; */
  margin: 0 auto;

  .itemName {
    width: 300px;
    font-size: 16px;
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
