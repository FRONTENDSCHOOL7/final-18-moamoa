import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import userToken from '../../Recoil/userTokenAtom';
import isLoginAtom from '../../Recoil/isLoginAtom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import userNameAtom from '../../Recoil/userNameAtom';

import Gobackbtn from '../../Components/Common/GoBackbtn';
import more from '../../Assets/icons/icon-more.svg';
import styled from 'styled-components';
import LogoutModal from '../../Components/Modal/LogoutModal';
import LogoutConfirmModal from '../../Components/Modal/LogoutConfirmModal';

export default function HeaderKebab() {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(userToken);
  const setIsLoginState = useSetRecoilState(isLoginAtom);
  const setAccountName = useSetRecoilState(accountNameAtom);
  const setUserName = useSetRecoilState(userNameAtom);

  const [showMyProfileOptions, setShowMyProfileOptions] = useState(false);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

  // ConfirmLogoutModal을 여는 함수
  const openConfirmLogoutModal = () => {
    setShowMyProfileOptions(false); // KebabClick 닫기
    setShowConfirmLogoutModal(true); // ConfirmLogoutModal 열기
  };
  // ConfirmLogoutModal을 닫는 함수
  const closeConfirmLogoutModal = () => {
    setShowConfirmLogoutModal(false);
  };

  const logout = () => {
    // 로그아웃 로직 처리
    closeConfirmLogoutModal();

    setToken('');
    localStorage.removeItem('token');
    setIsLoginState(false);
    setAccountName('');
    setUserName('');
    navigate('/user/login');
  };

  //모달 창 닫기
  const closeModal = () => {
    setShowMyProfileOptions(false);
  };
  const handleKebabClick = async () => {
    setShowMyProfileOptions(!showMyProfileOptions);
  };

  return (
    <>
      <HeaderContainer>
        <Gobackbtn />
        <button type='button' onClick={handleKebabClick}>
          <img src={more} />
        </button>
        {showMyProfileOptions && (
          <LogoutModal closeModal={closeModal} openConfirmLogoutModal={openConfirmLogoutModal} />
        )}
        {showConfirmLogoutModal && (
          <LogoutConfirmModal logout={logout} closeModal={closeConfirmLogoutModal} />
        )}
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  margin: 0 auto;
  z-index: 100;
  height: 48px;
  width: 390px;

  position: fixed;

  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;

  img {
    cursor: pointer;
  }
`;
