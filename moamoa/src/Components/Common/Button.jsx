/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

const ButtonSubmit = styled.button`
  width: 90px;
  height: 32px;
  border-radius: 32px;
  background: #87b7e4;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

export default function Button(props) {
  const { onClickHandler, disabled, buttonText } = props;

  return (
    <div>
      <ButtonSubmit disabled={disabled} onClick={onClickHandler}>
        {buttonText}
      </ButtonSubmit>
    </div>
  );
}
