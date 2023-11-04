import styled from 'styled-components';
import Email from '../../Assets/icons/icon-email.svg';
import Lock from '../../Assets/icons/icon-lock.svg';

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

export const Input = styled.input`
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

export const Button = styled.button`
  background-color: ${(props) => (props.disabled ? '#D8E7F5' : '#87B7E4')};
  border-radius: 44px;
  font-weight: 700;
  padding: 11px;
  color: white;
  margin: 26px 0 80px 0;
  letter-spacing: -1px;
`;

export const StyledErrorMsg = styled.div`
  color: red;
  text-align: left;
  margin-top: 6px;
`;
