import React from 'react';
import SearchHighLight from '../Common/SearchHighLight';
import PropTypes from 'prop-types';
import blueBadge from '../../Assets/icons/icon-usertype-check.svg';
import { BlueCheck, OfficialContainer, UserId } from './SearchStyle';

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
