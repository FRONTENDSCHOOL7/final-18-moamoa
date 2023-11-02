import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import userToken from '../../Recoil/userTokenAtom';

import Gobackbtn from '../../Components/Common/GoBackbtn';
import more from '../../Assets/icons/s-icon-more-vertical.svg';
import styled from 'styled-components';
import LogoutModal from '../../Components/Modal/LogoutModal';
import ConfirmLogoutModal from '../../Components/Modal/ConfirmLogoutModal';

export default function HeaderKebab() {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(userToken);

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
      </HeaderContainer>
      {showMyProfileOptions && (
        <LogoutModal closeModal={closeModal} openConfirmLogoutModal={openConfirmLogoutModal} />
      )}
      {showConfirmLogoutModal && (
        <ConfirmLogoutModal logout={logout} closeModal={closeConfirmLogoutModal} />
      )}
    </>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  width: 390px;
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
