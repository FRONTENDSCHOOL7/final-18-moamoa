import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../Pages/Landing';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />

      {/* 내 프로필 */}
      {/* <Route path="/user" element={<?? />} /> */}

      {/* 상품 등록 */}
      {/* <Route path="/product" element={<?? />} /> */}

      {/* 상품 리스트 */}
      {/* <Route path="/product/:accountname" element={<?? />} /> */}

      {/* 게시글 상세 */}
      {/* <Route path="/post/:post_id" element={<?? />} /> */}
    </Routes>
  );
}
