import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import userTokenAtom from '../../Recoil/UserToken';
import styled from 'styled-components';

const Input = styled.input`
  border-color: #dbdbdb;

  &:focus {
    border-color: #87b7e4;
    outline-color: #87b7e4;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailErrMsg = useState[0];
  const [loginErrMsg, setLoginErrMsg] = useState('');

  const setUserTokenAtom = useSetRecoilState(userTokenAtom);
  const saveToken = (token) => {
    setUserTokenAtom(token);
  };

  const login = async (email, password) => {
    const reqUrl = 'https://api.mandarin.weniv.co.kr/user/login';

    try {
      await axios({
        method: 'post',
        url: reqUrl,
        data: {
          user: {
            email: email,
            password: password,
          },
        },
      }).then((res) => {
        if (res.data.status === 422) {
          setLoginErrMsg(res.data.message);
          //'이메일 또는 비밀번호가 일치하지 않습니다.'
        } else if (res.data.user) {
          saveToken(res.data.user.token);
          navigate('/home');
        }
      });
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 422) {
          console.log(data);
        }
        if (status === 404) {
          //404 이미지 출력
        }

        if (status === 500) {
          console.log('Server error');
        }
      } else if (err.request) {
        console.log('Error', err.message);
      } else {
        console.log('Error', err.message);
      }
    }
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();

    login(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h1>로그인</h1>
      <section>
        <h2>이메일과 비밀번호 입력</h2>
        <form onSubmit={submitLogin}>
          <Input
            type='text'
            placeholder='이메일 입력'
            onChange={inputEmail}
            value={email}
            required
          />
          {emailErrMsg}
          <Input
            type='text'
            placeholder='비밀번호 입력'
            onChange={inputPassword}
            value={password}
            required
          />
          {loginErrMsg}
          <button disabled={!email || !password}>로그인</button>
          <button
            type='button'
            onClick={() => {
              navigate('/user/join');
            }}
          >
            회원가입
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
