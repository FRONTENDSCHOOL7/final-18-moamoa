import styled, { css } from 'styled-components';
import Email from '../../Assets/icons/icon-email.svg';
import Lock from '../../Assets/icons/icon-lock.svg';
import { Container } from './Container';

const COLORS = {
  primary: '#87b7e4',
  darkgray: '#767676',
  // lightgray: '#dbdbdb', //명암비: 1.38 // https://sitero.co.kr/contrast
};

const BtnHoverStyle = css`
  &:hover {
    background-color: ${COLORS.primary};
    color: white;
    border-color: ${COLORS.primary};
  }
`;

const HeadCss = css`
  text-align: center;
  font-weight: 400;
  font-size: 27px;
  margin-top: 30px;
`;

export const LoginAndJoinContainer = styled(Container)`
  h1,
  h2 {
    ${HeadCss}
  }
`;

export const Form = styled.form`
  padding: 0 34px;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #767676;
  margin: 45px 0 0 0;
  background-color: #fff;

  input[type='email']::-webkit-input-placeholder {
    font-size: 14px;
    color: ${COLORS.darkgray};
    font-family: 'Pretendard';
  }
  input[type='password']::-webkit-input-placeholder {
    font-size: 14px;
    color: ${COLORS.darkgray};
    font-family: 'Pretendard';
  }
  input[type='text']::-webkit-input-placeholder {
    font-size: 14px;
    color: ${COLORS.darkgray};
    font-family: 'Pretendard';
  }
`;

export const CommonInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1.5px solid ${COLORS.darkgray};

  background-image: url(${(props) => (props.type === 'email' ? Email : Lock)});
  background-repeat: no-repeat;
  background-position: 2% 50%;
  padding: 16px 0 16px 36px;

  &:focus {
    border-bottom: 1.5px solid ${COLORS.primary};
    transition: all 0.3s ease-in-out;
  }
`;

export const CommonBtn = styled.button`
  background-color: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};

  border: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};

  font-weight: 600;
  font-size: 15px;
  color: white;
  padding: 11px;
  border-radius: 44px;

  ${BtnHoverStyle}
`;

export const StyledErrorMsg = styled.p`
  color: red;
  text-align: right;
  margin-top: 7px;
  font-size: 13px;
`;
