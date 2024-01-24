import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import homeButton from '../../Assets/icons/icon-home.svg';
import chatButton from '../../Assets/icons/icon-message.svg';
import postButton from '../../Assets/icons/icon-post.svg';
import festivalButton from '../../Assets/icons/icon-festival.svg';
import profileButton from '../../Assets/icons/icon-user.svg';
import homeButtonFill from '../../Assets/icons/icon-home-fill.svg';
import chatButtonFill from '../../Assets/icons/icon-message-fill.svg';
import postButtonFill from '../../Assets/icons/icon-post-fill.svg';
import festivalButtonFill from '../../Assets/icons/icon-festival-fill.svg';
import profileButtonFill from '../../Assets/icons/icon-user-fill.svg';
import tabletLogoButton from '../../Assets/icons/icon-tablet-Logo.svg';
import logoutButton from '../../Assets/icons/icon-logout.svg';
import desktopLogoButton from '../../Assets/images/MOAMOA.png';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    { name: 'home', label: '홈', path: '/home', icon: homeButton, fillIcon: homeButtonFill },
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

  return (
    <TabMenu>
      <Link to='/home'>
        <TabletLogo src={tabletLogoButton} />
        <DesktopLogo src={desktopLogoButton} />
      </Link>
      {tabs.map((tab) => (
        <TabButton key={tab.name} onClick={() => handleToggleSwitch(tab.name)}>
          <TabBtnImg
            src={toggleSwitch === tab.name ? tab.fillIcon : tab.icon}
            alt={`${tab.name}으로 이동`}
          />

          <TabLabel $colors={toggleSwitch === tab.name ? +true : +false}>{tab.label}</TabLabel>
        </TabButton>
      ))}

      <TabletLogOut>
        <img src={logoutButton} alt='로그아웃' />
        <TabLabel className='logout'>로그아웃</TabLabel>
      </TabletLogOut>
    </TabMenu>
  );
}

const TabMenu = styled.div`
  width: 390px;
  height: 60px;
  background-color: #2e2c39;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  @media (min-width: 768px) {
    top: 0;
    bottom: 0;
    left: 60px;
    width: 120px;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1200px) {
    top: 0;
    bottom: 0;
    left: 100px;
    width: 240px;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
  height: 60px;
  width: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  align-items: center;

  @media (min-width: 768px) {
    margin-bottom: 16px;
  }
  @media (min-width: 1200px) {
    margin-left: 104px;
    justify-content: start;
    flex-direction: row;
    gap: 23px;
    width: 100%;
  }

  &:hover {
    opacity: 0.5;
  }
`;
const TabBtnImg = styled.img`
  padding-top: 5px;
`;

const TabLabel = styled.span`
  font-size: 10px;
  color: ${(props) => (props.$colors ? '#FFC700' : '#fff')};

  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

const TabletLogo = styled.img`
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 1200px) {
    display: none;
  }
  margin-block: 60px;
`;
const TabletLogOut = styled.button`
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50px;
    bottom: 80px;
    .logout {
      margin-top: 5px;
      transform: translateX(-30%);
    }
  }
  @media (min-width: 1200px) {
    flex-direction: row;
    gap: 34px;
    .logout {
    }
  }
  &:hover {
    opacity: 0.5;
  }
`;

const DesktopLogo = styled.img`
  width: 172px;
  margin-block: 60px;
  @media (max-width: 1199px) {
    display: none;
  }
`;
