import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../Hooks/Sign/useLogin';
import styled from 'styled-components';
import { Container } from '../../Components/Common/Container';
import { Form, Input, StyledErrorMsg } from '../../Components/Common/FormLoginAndJoin';

const LoginPage = () => {
  const {
    userInput,
    handleError,
    handleInputChange,
    handleFormSubmit,
    errorMsg,
    userErrorMessage,
  } = useLogin();

  return (
    <Container>
      <H1>로그인</H1>
      <Form onSubmit={handleFormSubmit}>
        <Input
          type='email'
          placeholder='이메일'
          name='email'
          onChange={handleInputChange}
          value={userInput.user.email}
          required
        />
        {!userInput.user.email && !userInput.user.password && (
          <StyledErrorMsg>{errorMsg}</StyledErrorMsg>
        )}
        <Input
          type='password'
          placeholder='비밀번호'
          name='password'
          onChange={handleInputChange}
          value={userInput.user.password}
          required
        />
        {userInput.user.email && !userInput.user.password && (
          <StyledErrorMsg>{errorMsg}</StyledErrorMsg>
        )}
        {userInput.user.email && userInput.user.password && (
          <StyledErrorMsg>{userErrorMessage}</StyledErrorMsg>
        )}
        <Button
          type='submit'
          onClick={handleError}
          disabled={!userInput.user.email || !userInput.user.password}
        >
          로그인
        </Button>
        <LinkContainer>
          <Link to='/user/join'>이메일로 회원가입</Link>
        </LinkContainer>
      </Form>
    </Container>
  );
};

const H1 = styled.h1`
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? '#D8E7F5' : '#87B7E4')};
  border-radius: 44px;
  font-weight: 700;
  padding: 11px;
  color: white;
  margin: 26px 0 21px 0;
  letter-spacing: -1px;
`;

const LinkContainer = styled.div`
  margin-bottom: 80px;
`;

export default LoginPage;
