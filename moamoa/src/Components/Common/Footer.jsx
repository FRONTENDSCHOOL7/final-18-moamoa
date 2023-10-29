/* eslint-disable */
import React, { useState } from 'react';
import { styled } from 'styled-components';

import { useNavigate } from 'react-router-dom';
import homeButton from '../../Assets/icons/icon-home.svg';
import chatButton from '../../Assets/icons/icon-message.svg';
import postButton from '../../Assets/icons/icon-edit.svg';
import festivalButton from '../../Assets/icons/icon-festival.svg';
import profileButton from '../../Assets/icons/icon-more.svg';
import homeButtonFill from '../../Assets/icons/icon-home.svg';
import chatButtonFill from '../../Assets/icons/icon-message.svg';
import postButtonFill from '../../Assets/icons/icon-edit.svg';
import festivalButtonFill from '../../Assets/icons/icon-festival.svg';
import profileButtonFill from '../../Assets/icons/icon-more.svg';

export default function Footer() {
  //  const [toggleCount, setToggleCount] = useState(false);
  //  const [iconColor, setIconColor] = useState(heartBg);
  //    const handletoggleCount = () => {
  //      if (toggleCount === true) {
  //        setHeartColor(homeFill);
  //        setHeartCount(postprop.heartCount);
  //      } else {
  //        setHeartColor(heartBg);
  //        setHeartCount(postprop.heartCount);
  //      }

  //      console.log(heartCount);
  //    };
  return (
    <TabMenu>
      <img src='{HomeBtno}' alt='' />1
      <img src='{chatButton}' alt='' />1
      <img src='{postButton}' alt='' />1
      <img src='{festivalButton}' alt='' />1
      <img src='{profileButton}' alt='' />1
    </TabMenu>
  );
}
const TabMenu = styled.div`
`;

const HomeButton = styled.img`
  width: 24px;
  height: 24px;
`;
