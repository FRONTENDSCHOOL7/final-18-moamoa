import React from 'react';
import SearchHighLight from '../Common/SearchHighLight';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import blueBadge from '../../Assets/icons/icon-usertype-check.svg';

export default function RenderUserId({ item, searchText }) {
  RenderUserId.propTypes = {
    item: PropTypes.object,
    searchText: PropTypes.string,
  };

  const cleanUserId = item.username.replace(/\[i\]|\[o\]/g, '');

  const officialBlueCheck = (username) => {
    if (username.slice(0, 3) === '[o]') {
      return <BlueCheck src={blueBadge} alt='' />;
    }
    return null;
  };

  return (
    <OfficialContainer>
      <UserId>{SearchHighLight(cleanUserId, searchText)}</UserId>
      {officialBlueCheck(item.username)}
    </OfficialContainer>
  );
}

const UserId = styled.h2`
  font-size: 14px;
`;
const BlueCheck = styled.img`
  padding-left: 0.3rem;
  width: 1.2rem;
`;
const OfficialContainer = styled.div`
  display: flex;
  align-items: center;
  vertical-align: top;
`;
