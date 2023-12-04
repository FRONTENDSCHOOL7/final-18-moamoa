import React, { useEffect, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { ProductListAPI } from '../../API/Product/ProductListAPI';
import ProductListLoading from '../../Components/Product/ProductListLoading';
import ProductOutput from '../../Components/Product/ProductOutput';
import styled from 'styled-components';
import { ContainerPercent } from '../../Components/Common/Container';
import Header from '../../Components/Common/HeaderProductList';
import Footer from '../../Components/Common/Footer';

export const ProductAtom = atom({
  key: 'ProductState',
  default: [],
});

export default function ProductList() {
  const [, setProduct] = useRecoilState(ProductAtom);
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
    <ContainerPercent>
      <Header />
      <ProductListWrap>
        {loading ? (
          <ProductListLoading />
        ) : error ? (
          <p>Error:{error.message}</p>
        ) : (
          <ProductOutput />
        )}
      </ProductListWrap>
      <Footer></Footer>
    </ContainerPercent>
  );
}

const ProductListWrap = styled.div`
  margin-top: 48px;
`;
