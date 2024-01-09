import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ProductAtom } from '../../Recoil/ProductAtom';

import { Link } from 'react-router-dom';
import { ProductListImgBox } from '../../Components/Common/ProductImgBox';
import TopNavigation from '../../Components/Product/TopNavigation';
import { filterActive } from './filterActive';
import {
  formatEventStartDate,
  formatEventEndDate,
  semanticStartDate,
  semanticEventEndDate,
} from './formatEventDate';
import { ProductContainer, ProductBox } from './ProductStyle';

export default function ProductBundle() {
  const product = useRecoilValue(ProductAtom);
  const filteredProducts = product.filter(filterActive);

  const [nextPage, setNextPage] = useState(4);
  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;

      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition === documentHeight) {
        setNextPage((prev) => prev + 4);
      }
      console.log(nextPage);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <TopNavigation />
      <ProductContainer>
        {filteredProducts.slice(0, nextPage).map((item, index) => (
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
