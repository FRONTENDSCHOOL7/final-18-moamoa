import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    console.log(target);
    if (target.isIntersecting) {
      setNextPage((prev) => prev + 4);
    }
  });
  const observerElem = useRef(null);
  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '10px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    const element = observerElem.current;

    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

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
      <div className='loader' ref={observerElem}></div>
    </>
  );
}
