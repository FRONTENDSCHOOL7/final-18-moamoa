import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '../../Components/Product/ProductForm';
import { useProductData } from '../../Hooks/Product/useProductData';
import { useSubmitProductForm } from '../../Hooks/Product/useSubmitProductForm';
import { getProductDetail, editProduct } from '../../API/Product/ProductAPI';
import useDateValidation from '../../Hooks/Product/useDateValidation';
// Styled-Component 수정 예정
import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import DefaultImg from '../../Assets/images/img-product-default.png';
import { Header } from '../../Components/Common/ProductSharedStyle';

const ProductEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.product_id;

  const initialState = {
    imgSrc: DefaultImg,
    productType: '',
    productName: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    missingInputMessage: '',
  };

  const {
    imgSrc,
    setImgSrc,
    productType,
    setProductType,
    productName,
    setProductName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,
    description,
    setDescription,
    missingInputMessage,
    setMissingInputMessage,
  } = useProductData(initialState);

  const { progressPeriod, dateSelectionErrorMsg } = useDateValidation(startDate, endDate);

  const getProductData = (data) => {
    const productType = data.product.itemName.slice(0, 3) === '[f]' ? 'festival' : 'experience';
    const productName = data.product.itemName.slice(3);
    const [description, location] = data.product.link.split('+[l]');
    const period = data.product.price.toString();
    const startDate = `${period.slice(0, 4)}-${period.slice(4, 6)}-${period.slice(6, 8)}`;
    const endDate = `${period.slice(8, 12)}-${period.slice(12, 14)}-${period.slice(14, 16)}`;

    setProductType(productType);
    setProductName(productName);
    setImgSrc(data.product.itemImage);
    setDescription(description);
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      await getProductDetail(productId, getProductData);
    };

    fetchProductInfo();
  }, []);

  const productData = {
    product: {
      itemName: productType === 'festival' ? `[f]${productName}` : `[e]${productName}`,
      price: progressPeriod,
      link: `${description}+[l]${location}`,
      itemImage: imgSrc,
    },
  };

  const validationChecks = () => {
    if (
      !imgSrc ||
      productName.length < 2 ||
      !startDate ||
      !endDate ||
      !location ||
      !description ||
      !productType ||
      startDate > endDate
    ) {
      setMissingInputMessage('입력하지 않은 정보가 있습니다. 다시 확인해주세요.');
      return false;
    } else {
      setMissingInputMessage('');
      return true;
    }
  };

  const submitProductForm = useSubmitProductForm(
    editProduct,
    navigate,
    productData,
    validationChecks,
    productId,
  );

  return (
    <Container>
      <Header>
        <Gobackbtn />
      </Header>
      <h1 className='a11y-hidden'>상품 수정 페이지</h1>
      <ProductForm
        product={{ imgSrc, productName, productType, startDate, endDate, location, description }}
        setImgSrc={setImgSrc}
        setProductType={setProductType}
        setProductName={setProductName}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        dateSelectionErrorMsg={dateSelectionErrorMsg}
        setLocation={setLocation}
        setDescription={setDescription}
        onSubmit={submitProductForm}
        missingInputMessage={missingInputMessage}
      />
    </Container>
  );
};

export default ProductEdit;
