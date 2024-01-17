import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // npm install prop-types 설치 필요

ProductImgBox.propTypes = {
  src: PropTypes.string.isRequired,
};
ProductListImgBox.propTypes = {
  src: PropTypes.string.isRequired,
};

export default function ProductImgBox(props) {
  return (
    <div>
      <ImgBox src={props.src} />
    </div>
  );
}
export function ProductListImgBox(props) {
  return (
    <div>
      <ProductListPoster src={props.src} />
    </div>
  );
}

const ImgBox = styled.img.attrs({ alt: '축제포스터' })`
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  width: 172px;
  height: 110px;
`;

const ProductListPoster = styled(ImgBox)`
  width: 370px;
  height: 140px;
  object-fit: fill;
`;