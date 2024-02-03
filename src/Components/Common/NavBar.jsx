import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import homeButton from '../../Assets/icons/icon-home.svg';
import chatButton from '../../Assets/icons/icon-message.svg';
import postButton from '../../Assets/icons/icon-post.svg';
import festivalButton from '../../Assets/icons/icon-festival.svg';
import profileButton from '../../Assets/icons/icon-user.svg';
import searchButton from '../../Assets/icons/icon-searchWhite.svg';
import homeButtonFill from '../../Assets/icons/icon-home-fill.svg';
import chatButtonFill from '../../Assets/icons/icon-message-fill.svg';
import postButtonFill from '../../Assets/icons/icon-post-fill.svg';
import festivalButtonFill from '../../Assets/icons/icon-festival-fill.svg';
import profileButtonFill from '../../Assets/icons/icon-user-fill.svg';
import tabletLogoButton from '../../Assets/icons/icon-tablet-Logo.svg';
import logoutButton from '../../Assets/icons/icon-logout.svg';
import desktopLogoButton from '../../Assets/images/MOAMOA.png';
import searchButtonFill from '../../Assets/icons/icon-search-fill.svg';
import {
  showConfirmLogoutModalState,
  showMyProfileOptionsState,
} from '../../Recoil/logoutModalAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import HeaderMoreBtnModal from '../Modal/HeaderMoreBtnModal';
import LogoutModal from '../Modal/LogoutModal';
import userTokenAtom from '../../Recoil/userTokenAtom';
import isLoginAtom from '../../Recoil/isLoginAtom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import userNameAtom from '../../Recoil/userNameAtom';
import postsAtom from '../../Recoil/postsAtom';
import {
  TabMenu,
  TabletLogo,
  DesktopLogo,
  TabButton,
  TabBtnImg,
  TabLabel,
  TabletLogOut,
} from './NavBarStyle';
export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMyProfileOptions, setShowMyProfileOptions] = useRecoilState(showMyProfileOptionsState);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useRecoilState(
    showConfirmLogoutModalState,
  );
  TabButton.propTypes = {
    hideOnMobile: PropTypes.bool,
  };

  const tabs = [
    { name: 'home', label: '홈', path: '/home', icon: homeButton, fillIcon: homeButtonFill },
    {
      name: 'search',
      label: '검색',
      path: '/search',
      icon: searchButton,
      fillIcon: searchButtonFill,
    },

    { name: 'chat', label: '채팅', path: '/chat', icon: chatButton, fillIcon: chatButtonFill },
    {
      name: 'post',
      label: '게시물 작성',
      path: '/post',
      icon: postButton,
      fillIcon: postButtonFill,
    },
    {
      name: 'productList',
      label: '축제 & 체험',
      path: '/product/list',
      icon: festivalButton,
      fillIcon: festivalButtonFill,
    },
    {
      name: 'myProfile',
      label: '프로필',
      path: '/profile/myInfo',
      icon: profileButton,
      fillIcon: profileButtonFill,
    },
  ];

  const currentPath = location.pathname;

  const initialTab = tabs.find((tab) => tab.path === currentPath);

  const [toggleSwitch, setToggleSwitch] = useState(initialTab ? initialTab.name : 'home');

  const handleToggleSwitch = (tabName) => {
    const selectedTab = tabs.find((tab) => tab.name === tabName);
    if (selectedTab) {
      setToggleSwitch(tabName);
      navigate(selectedTab.path);
    }
  };

  // ConfirmLogoutModal을 여는 함수
  const openConfirmLogoutModal = () => {
    setShowMyProfileOptions(false);
    setShowConfirmLogoutModal(true);
  };
  // ConfirmLogoutModal을 닫는 함수
  const closeConfirmLogoutModal = () => {
    setShowConfirmLogoutModal(false);
  };
  const handleKebabClick = async () => {
    setShowMyProfileOptions(!showMyProfileOptions);
  };
  //모달 창 닫기
  const closeModal = () => {
    setShowMyProfileOptions(false);
  };
  const setToken = useSetRecoilState(userTokenAtom);
  const setIsLoginState = useSetRecoilState(isLoginAtom);
  const setAccountName = useSetRecoilState(accountNameAtom);
  const setUserName = useSetRecoilState(userNameAtom);
  const setPostsData = useSetRecoilState(postsAtom);
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
    navigate('/user/login');
  };
  return (
    <>
      <TabMenu>
        <Link to='/home'>
          <TabletLogo src={tabletLogoButton} />
          <DesktopLogo src={desktopLogoButton} />
        </Link>
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            onClick={() => handleToggleSwitch(tab.name)}
            hideOnMobile={tab.name === 'search'}
          >
            <TabBtnImg
              src={toggleSwitch === tab.name ? tab.fillIcon : tab.icon}
              alt={`${tab.name}으로 이동`}
            />

            <TabLabel $colors={toggleSwitch === tab.name ? +true : +false}>{tab.label}</TabLabel>
          </TabButton>
        ))}

        <TabletLogOut onClick={handleKebabClick}>
          <img src={logoutButton} className='logoutImg' alt='로그아웃' />
          <TabLabel className='logoutText'>로그아웃</TabLabel>
        </TabletLogOut>
      </TabMenu>
      {showConfirmLogoutModal && (
        <LogoutModal logout={logout} closeModal={closeConfirmLogoutModal} />
      )}
      {showMyProfileOptions && (
        <HeaderMoreBtnModal
          closeModal={closeModal}
          openConfirmLogoutModal={openConfirmLogoutModal}
        />
      )}
    </>
  );
}
