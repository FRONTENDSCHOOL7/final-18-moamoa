import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

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
      {tabs.map((tab) => (
        <TabButton key={tab.name} onClick={() => handleToggleSwitch(tab.name)}>
          <TabBtnImg src={toggleSwitch === tab.name ? tab.fillIcon : tab.icon} />
          <TabLabel $colors={toggleSwitch === tab.name ? +true : +false}>{tab.label}</TabLabel>
        </TabButton>
      ))}
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
`;

const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
  width: 78px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const TabBtnImg = styled.img`
  padding-top: 5px;
`;
const TabLabel = styled.span`
  font-size: 10px;
  color: ${(props) => (props.$colors ? '#FFC700' : '#fff')};
`;
