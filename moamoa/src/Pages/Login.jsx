import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import userToken from '../Recoil/UserToken';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useSetRecoilState(userToken);

  const login = async (email, password) => {
    const baseUrl = 'https://api.mandarin.weniv.co.kr';
    const reqPath = '/user/login';
    const reqUrl = baseUrl + reqPath;

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
        //status 200//
        console.log(res);

        // 이메일,비밀번호 모두 입력 완료 하지만 불일치
        if (res.data.message === '이메일 또는 비밀번호가 일치하지 않습니다.') {
          console.log('이메일 또는 비밀번호가 일치하지 않습니다.');
        }

        // 이메일, 비밀번호 모두 입력 완료 그리고 일치!
        if (res.data.user) {
          console.log(res.data.user);
          // //로컬스토리지에 토큰 저장하기

          setToken(res.data.user.token);
          // navigate('/product');
          navigate(`/profile/${res.data.user.accountname}`); //프로필 페이지로 이동(test용)
        }
      });
    } catch (err) {
      //status 422
      //에러 처리
      if (err.response) {
        console.log(err);
        // 요청이 이루어졌고 서버가 응답했을 경우
        const { status, config, data } = err.response;

        if (status === 422) {
          console.log(data);
        }

        if (status === 404) {
          //404 이미지 출력
          console.log(`${config.url} not found`);
        }

        if (status === 500) {
          console.log('Server error');
        }
      } else if (err.request) {
        // 요청이 이루어졌으나 서버에서 응답이 없었을 경우
        console.log('Error', err.message);
      } else {
        // 그 외 다른 에러
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
  };

  return (
    <>
      <h1>로그인</h1>
      <section>
        <h2>이메일, 비밀번호 입력하는 곳</h2>
        <form onSubmit={submitLogin}>
          <input type='text' placeholder='이메일 입력' onChange={inputEmail} value={email} />
          <input
            type='text'
            placeholder='비밀번호 입력'
            onChange={inputPassword}
            value={password}
          />
          <button>로그인</button>
          <button
            type='button'
            onClick={() => {
              navigate('/user');
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
