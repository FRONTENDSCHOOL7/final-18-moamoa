import styled, { css } from 'styled-components';
import Email from '../../Assets/icons/icon-email.svg';
import Lock from '../../Assets/icons/icon-lock.svg';
import { Container } from '../../Components/Common/Container';

const HeadCss = css`
  text-align: center;
  font-weight: 400;
  font-size: 24px;
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
  font-size: 12px;
  margin: 45px 0 0 0;
  background-color: #fff;
`;

export const CommonInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1.5px solid #dbdbdb;
  letter-spacing: -1px;
  background-image: url(${(props) => (props.type === 'email' ? Email : Lock)});
  background-repeat: no-repeat;
  background-position: 2% 50%;
  padding: 16px 0 16px 36px;
  &:focus {
    border-bottom: 1.5px solid #87b7e4;
    transition: all 0.3s ease-in-out;
  }
`;

export const CommonBtn = styled.button`
  background-color: ${(props) => (props.disabled ? '#D8E7F5' : '#87B7E4')};
  border-radius: 44px;
  font-weight: 700;
  padding: 11px;
  color: white;
  letter-spacing: -1px;
`;

export const StyledErrorMsg = styled.div`
  color: red;
  text-align: left;
  margin-top: 6px;
`;
