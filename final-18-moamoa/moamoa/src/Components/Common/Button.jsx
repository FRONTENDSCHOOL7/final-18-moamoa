import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

Button.propTypes = {
  onClickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  bordered: PropTypes.bool,
  width: PropTypes.string,
};

export default function Button(props) {
  const { onClickHandler, disabled, buttonText, backgroundColor, color, bordered } = props;

  return (
    <div>
      <ButtonSubmit
        width={props.width}
        disabled={disabled}
        onClick={onClickHandler}
        $backgroundColor={backgroundColor}
        color={color}
        style={{
          border: bordered ? '1px solid #dbdbdb' : 'none',
        }}
      >
        {buttonText}
      </ButtonSubmit>
    </div>
  );
}

const ButtonSubmit = styled.button`
  width: ${(props) => (props.width ? `${props.width}px` : '90px')};
  background-color: ${(props) =>
    props.disabled ? '#DDE7F0' : props.$backgroundColor ? `${props.$backgroundColor}` : '#87b7e4'};
  color: ${(props) => (props.color ? `${props.color}` : '#fff')};
  border: ${(props) => (props.border ? `${props.color}` : '#fff')};

  height: 32px;
  border-radius: 32px;
  font-family: pretendard;
  font-size: 14px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
