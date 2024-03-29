import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import AskBtn from '../../Components/Product/AskBtn';
import ArticleUserProfile from '../../Components/Common/ArticleUserProfile';
import NavBar from '../../Components/Common/NavBar';
import { FestivalContainer, FestivalArticle, Frofile } from './ProductStyle';

import { getProductDetail } from '../../API/Product/ProductAPI';
import ProductContents from '../../Components/Product/ProductContents';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.product_id;
  const [productData, setProductData] = useState();
  const [productAuthorInfo, setProductAuthorInfo] = useState();

  const profileImg = productAuthorInfo?.image;
  const userName = productAuthorInfo?.username;
  const accountName = productAuthorInfo?.accountname;

  const userProfileData = { profileImg, userName, accountName };
  const btnData = { userName, accountName };

  const getProductData = (data) => {
    setProductData(data.product);
    setProductAuthorInfo(data.product.author);
  };

  const getProductInfo = () => {
    return getProductDetail(productId, getProductData)
  };

  useEffect(() => {
    const getData = async () => {
      await getProductInfo();
    };
    getData();
  }, []);

  return (
    <>
      <Header type='home' />
      {productData && productAuthorInfo && (
        <FestivalContainer>
          <FestivalArticle>
            <Frofile>
              <ArticleUserProfile userProfileData={userProfileData} />
              <AskBtn btnData={btnData} />
            </Frofile>
            <ProductContents productData={productData} />
          </FestivalArticle>
          <NavBar />
        </FestivalContainer>
      )}
    </>
  );
}