import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userToken from '../../Recoil/userTokenAtom';
import isLoginAtom from '../../Recoil/isLoginAtom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import userNameAtom from '../../Recoil/userNameAtom';

import HomeBtn from '../Button/HomeBtn';
import Gobackbtn from '../Button/GoBackbtn';
import more from '../../Assets/icons/icon-more.svg';
import styled from 'styled-components';
import HeaderMoreBtnModal from '../Modal/HeaderMoreBtnModal';
import LogoutModal from '../Modal/LogoutModal';
import postsAtom from '../../Recoil/postsAtom';
import {
  showConfirmLogoutModalState,
  showMyProfileOptionsState,
} from '../../Recoil/logoutModalAtom';

export default function HeaderKebab() {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(userToken);
  const setIsLoginState = useSetRecoilState(isLoginAtom);
  const setAccountName = useSetRecoilState(accountNameAtom);
  const setUserName = useSetRecoilState(userNameAtom);
  const setPostsData = useSetRecoilState(postsAtom);

  const [showMyProfileOptions, setShowMyProfileOptions] = useRecoilState(showMyProfileOptionsState);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useRecoilState(
    showConfirmLogoutModalState,
  );

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
    localStorage.removeItem('recoil-persist');
    setIsLoginState(false);
    setAccountName('');
    setUserName('');
    setPostsData(null);
    navigate('/');
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
        <HomeBtn />
        <button type='button' onClick={handleKebabClick}>
          <img src={more} alt='더 보기' style={{width:"2.2rem",height:"2.2rem"}}/>
        </button>
        {showMyProfileOptions && (
          <HeaderMoreBtnModal
            closeModal={closeModal}
            openConfirmLogoutModal={openConfirmLogoutModal}
          />
        )}
        {showConfirmLogoutModal && (
          <LogoutModal logout={logout} closeModal={closeConfirmLogoutModal} />
        )}
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  margin: 0 auto;
  z-index: 3;
  height: 48px;
  // width: 390px;
  width: 100%;

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
  @media (min-width: 768px) {
    display: none;
  }
`;
