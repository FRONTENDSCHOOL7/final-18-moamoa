import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isLoginAtom from '../Recoil/isLoginAtom';

export default function PrivateRoute() {
  const isLogin = useRecoilValue(isLoginAtom);

  return isLogin ? <Outlet /> : <Navigate to={'/'} replace />;
}
