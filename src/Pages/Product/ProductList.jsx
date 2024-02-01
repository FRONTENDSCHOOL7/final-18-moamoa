import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import 'react-loading-skeleton/dist/skeleton.css';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { ProductListAPI } from '../../API/Product/ProductAPI';
import ProductListSkeleton from '../../Components/Product/ProductListSkeleton';
import ProductOutput from '../../Components/Product/ProductOutput';
import { Container } from '../../Components/Common/Container';
import Header from '../../Components/Common/Header/Header';
import NavBar from '../../Components/Common/NavBar';
import { ProductListWrap } from './ProductStyle';
import { ProductAtom } from '../../Recoil/ProductAtom';

export default function ProductList() {
  const setProduct = useSetRecoilState(ProductAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useRecoilValue(userTokenAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        const productList = await ProductListAPI(token);
        setProduct(productList);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [token, setProduct]);

  return (
    <Container>
      <Header type='home' />
      <ProductListWrap>
        {loading ? (
          <ProductListSkeleton />
        ) : error ? (
          <p>Error:{error.message}</p>
        ) : (
          <ProductOutput />
        )}
      </ProductListWrap>
      <NavBar></NavBar>
    </Container>
  );
}
