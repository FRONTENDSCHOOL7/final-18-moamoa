import React from 'react';
import { useRecoilValue } from 'recoil';
import { ProductAtom } from '../../Recoil/ProductAtom';

import { Link } from 'react-router-dom';
import { ProductListImgBox } from '../../Components/Common/ProductImgBox';
import TopNavigation from '../../Components/Product/TopNavigation';
import { filterActive } from './filterActive';
import { formatEventStartDate } from './formatEventDate';
import { formatEventEndDate } from './formatEventDate';
import { semanticStartDate } from './formatEventDate';
import { semanticEventEndDate } from './formatEventDate';
import { ProductContainer, ProductBox } from './ProductStyle';

export default function ProductBundle() {
  const product = useRecoilValue(ProductAtom);
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
