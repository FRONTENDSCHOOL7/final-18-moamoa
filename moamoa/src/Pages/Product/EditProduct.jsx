import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadImage } from '../../API/Img/UploadImageAPI';
import ProductDetailAPI from '../../API/Product/ProductDetailAPI';
import ProductEditAPI from '../../API/Product/ProductEditAPI';

const EditProduct = () => {
  const [eventType, setEventType] = useState('');
  const [productInputs, setProductInputs] = useState({
    product: {
      itemName: '',
      price: '',
      link: '',
      itemImage: '',
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state;
  const productParam = productId.product_id;
  const [isModified, setIsModified] = useState(false);
  const productDetail = ProductDetailAPI(productParam);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventPeriod, setEventPeriod] = useState(1);
  const [periodInfoMsg, setPeriodInfoMsg] = useState('');
  const { handleProductEdit } = ProductEditAPI(productParam, productInputs, eventType, eventPeriod);

  const handleItemName = (item) => {
    item.includes('[f]') ? setEventType('festival') : setEventType('experience');
    return item.slice(3);
  };

  useEffect(() => {
    const getProductDetailData = async () => {
      const detailData = await productDetail();

      if (detailData && Object.keys(detailData).length > 0) {
        setProductInputs((prev) => ({
          product: {
            ...prev.productInput,
            itemName: handleItemName(detailData.product.itemName),
            price: detailData.product.price,
            link: detailData.product.link,
            itemImage: detailData.product.itemImage,
          },
        }));
        const date = detailData.product.price.toString();
        setEventStartDate(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`);
        setEventEndDate(`${date.slice(8, 12)}-${date.slice(12, 14)}-${date.slice(14, 16)}`);
      }
    };

    getProductDetailData();
  }, [productDetail]);

  console.log(productInputs);

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    const response = await uploadImage(imageFile);
    setProductInputs({
      ...productInputs,
      product: { ...productInputs.product, itemImage: response },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInputs((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  };

  const checkTwoDates = () => {
    if (eventStartDate && eventEndDate && eventStartDate > eventEndDate) {
      setPeriodInfoMsg('행사 시작 날짜와 행사 종료 날짜를 다시 확인해주세요.');
    } else {
      setPeriodInfoMsg('');
    }
  };

  const twoDatesIntoOneString = () => {
    const datesArr = [];
    if (eventStartDate) {
      datesArr.push(eventStartDate);
    }
    if (eventEndDate) {
      datesArr.push(eventEndDate);
    }

    const putDatesIntoArray = datesArr
      .map((date) => parseInt(date.replaceAll('-', '')))
      .sort((firstDate, lastDate) => firstDate - lastDate);
    setEventPeriod(parseInt(putDatesIntoArray.join('')));
  };

  useEffect(() => {
    checkTwoDates();
    twoDatesIntoOneString();
  }, [eventStartDate, eventEndDate]);

  const editProduct = async (e) => {
    e.preventDefault();
    await handleProductEdit();
    setIsModified(true);
  };

  // useEffect(() => {
  //   if (isModified) navigate(`/product/detail/${productParam}`, { state: { isModified } });
  // }, [isModified, navigate]); //해당 상품 상세 페이지로 이동

  useEffect(() => {
    if (isModified) navigate(`/product/list`, { state: { isModified } });
  }, [isModified, navigate]); //상품 리스트 페이지로 이동

  return (
    <main>
      <h1>상품 수정 페이지</h1>
      <form onSubmit={editProduct}>
        <section>
          <h2>이미지 등록</h2>
          <label htmlFor='upload-file'>
            <img
              src={
                productInputs.product.itemImage ||
                'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_03e7c925-a8a5-4923-905c-e12586ec0a44_3.png'
              }
              alt={productInputs.product.itemName}
              srcSet=''
              id='imagePre'
            />
          </label>
          <input id='upload-file' type='file' accept='image/*' onChange={handleChangeImage}></input>
          <p>* 행사 관련 이미지를 등록해주세요.</p>
        </section>
        <div>
          <h2>카테고리</h2>
          <button type='button' onClick={() => setEventType('festival')}>
            축제
          </button>
          <button type='button' onClick={() => setEventType('experience')}>
            체험
          </button>
        </div>
        <div>
          <label htmlFor='event-name'>행사명</label>
          <input
            id='event-name'
            type='text'
            placeholder='2~22자 이내여야 합니다.'
            pattern='.{2,22}'
            title='2~22자 이내여야 합니다.'
            onChange={handleInputChange}
            name='itemName'
            value={productInputs.product.itemName}
          ></input>
        </div>
        <div>
          <label htmlFor='event-period'>
            행사 기간
            <input
              type='date'
              id='event-period'
              onChange={(e) => setEventStartDate(e.target.value)}
              value={eventStartDate}
              pattern='yyyy-MM-dd'
              max='9999-12-31'
            ></input>
            <input
              type='date'
              id='event-period'
              onChange={(e) => setEventEndDate(e.target.value)}
              value={eventEndDate}
              pattern='yyyy-MM-dd'
              max='9999-12-31'
            ></input>
            {periodInfoMsg}
          </label>
        </div>
        <div>
          <label htmlFor='event-detail'>상세 설명</label>
          <textarea
            id='event-detail'
            name='link'
            placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
            onChange={handleInputChange}
            value={productInputs.product.link}
          ></textarea>
        </div>
        <button
          disabled={
            !productInputs.product.itemImage ||
            !productInputs.product.itemName ||
            !eventStartDate ||
            !eventEndDate ||
            !productInputs.product.link ||
            !eventType
          }
        >
          수정
        </button>
      </form>
    </main>
  );
};

export default EditProduct;
