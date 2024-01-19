import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Common/Header/Header';
import AskBtn from '../../Components/Product/AskBtn';
import ArticleUserProfile from '../../Components/Common/ArticleUserProfile';
import Footer from '../../Components/Common/Footer';
import { FestivalContainer, FestivalArticle, Frofile } from './ProductStyle';

import { getProductDetail } from '../../API/Product/ProductAPI';
import ProductContents from '../../Components/Product/ProductContents';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.product_id;
  const [productData, setProductData] = useState();
  const [productAuthorInfo, setProductAuthorInfo] = useState();

  const profileImg = productAuthorInfo?.image;
  const userName = productAuthorInfo?.username?.slice(3);
  const accountName = productAuthorInfo?.accountname;

  const userProfileData = { profileImg, userName, accountName };
  const btnData = { userName, accountName };

  const getProductData = (data) => {
    setProductData(data.product);
    setProductAuthorInfo(data.product.author);
  };

  const getProductInfo = () => getProductDetail(productId, getProductData);

  useEffect(() => {
    const getData = async () => {
      await getProductInfo();
    };
    getData();
  }, []);

  return (
    <>
      {productData && productAuthorInfo && (
        <FestivalContainer>
          <Header type='home' />
          <FestivalArticle>
            <Frofile>
              <ArticleUserProfile userProfileData={userProfileData} />
              <AskBtn btnData={btnData} />
            </Frofile>
            <ProductContents productData={productData} />
          </FestivalArticle>
          <Footer />
        </FestivalContainer>
      )}
    </>
  );
}