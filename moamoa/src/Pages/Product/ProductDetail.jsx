import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';

export default function ProductDetail() {
  const productState = atom({
    key: 'productData',
    default: null,
  });

  const [productData, setProductData] = useRecoilState(productState);
  const [productId, setProductId] = useState([]);
  const [pageIndex, setPageIndex] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      const token = localStorage.getItem('token');
      const reqUrl = `https://api.mandarin.weniv.co.kr/product`;

      try {
        const res = await fetch(reqUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const product = await res.json();
          setProductData(product);

          const idList = product.product.map((item) => item._id);
          console.log(idList);
          setProductId(idList);
        } else {
          console.error('상세페이지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버와 통신을 실패했습니다.', error);
      }
    };

    getProductData();
  }, []);

  const params = useParams();
  console.log(params);
  const pageIdx = params.product_id ? productId.indexOf(params.product_id) : -1;

  useEffect(() => {
    if (pageIdx !== -1) {
      setPageIndex(pageIdx);
    }
  }, [pageIdx]);

  return (
    <>
      {productData && pageIndex !== null && pageIndex !== -1 && (
        <div>
          <div>
            <img src='' alt='사용자' />
            <p>
              {productData.product[pageIndex]?.author?.username || '사용자를 찾을 수 없습니다.'}
            </p>
            <p>{productData.product[pageIndex]?.author?.accountname || ''}</p>
            <button>문의하기</button>
          </div>
          <img src={productData.product[pageIndex]?.itemImage || ''} alt='행사' />
          <div>
            <h3>{productData.product[pageIndex]?.itemName || '행사명을 조회할 수 없습니다.'}</h3>
            <h4>행사 소개</h4>
            <p>{productData.product[pageIndex]?.link || '행사 상세 설명을 조회할 수 없습니다.'}</p>
            <h4>행사 기간</h4>
            <p>{productData.product[pageIndex]?.price || '행사 기간을 조회할 수 없습니다.'}</p>
          </div>
        </div>
      )}
    </>
  );
}
