import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from '../Pages/ProductDetail';
import ProductList from '../Pages/ProductList';
import AddProduct from '../Pages/AddProduct';
import LoginPage from '../Pages/Login';
import JoinPage from '../Pages/Join';
import ProfileInfo from '../Pages/ProfileInfo';
import EditProfile from '../Pages/EditProfile';
import AddPost from '../Pages/AddPost';
// import Landing from '../Pages/Landing';

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path='/' element={<Landing />} /> */}

      {/* 내 프로필 */}
      <Route path='/profile' element={<ProfileInfo />} />

      {/* 내 프로필 수정*/}
      <Route path='/profile/edit' element={<EditProfile />} />
      {/* 공통파일 프로필 수정 경로추가 */}

      {/* 게시글 작성 */}
      <Route path='/post' element={<AddPost />} />
      {/* 공통파일 프로필 수정 경로추가 */}

      {/* 로그인 */}
      {/* <Route path='/login' element={<?? />} /> */}

      {/* 상품 등록 */}
      <Route path='/product' element={<AddProduct />} />

      {/* 상품 리스트 */}
      <Route path='/product/:accountname' element={<ProductList />} />

      {/* 상품 상세 */}
      <Route path='/product/detail/:product_id' element={<ProductDetail />} />

      {/* 게시글 상세 */}
      {/* <Route path="/post/:post_id" element={<?? />} /> */}

      <Route path='/user/login' element={<LoginPage />} />
      <Route path='/user' element={<JoinPage />} />
    </Routes>
  );
}
