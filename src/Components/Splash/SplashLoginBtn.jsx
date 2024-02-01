import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Bluemoa from '../../Assets/images/Bluemoa.png';
import kakao from '../../Assets/images/kakao.png';
import google from '../../Assets/images/google.png';
import naver from '../../Assets/images/naver.png';
import { useNavigate } from 'react-router-dom';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { useRecoilValue } from 'recoil';
import { BtnContainter, StyledButton } from './SplashStyle';
export function TempLoginButton({ className, children, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

TempLoginButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
StyledButton.propTypes = {
  borderColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundPosition: PropTypes.string,
  backgroundSize: PropTypes.string,
  opacity: PropTypes.string,
};
export default function SplashLoginBtn() {
  const navigate = useNavigate();
  const userToken = useRecoilValue(userTokenAtom);
  useEffect(() => {
    if (userToken) {
      navigate('/');
      setTimeout(() => {
        navigate('/home');
      }, 2998);
    } else {
      navigate('/');
    }
  }, []);
  const handleEmailLogin = () => {
    navigate('/user/login');
  };
  return (
    <BtnContainter>
      <StyledButton
        borderColor='#017dc2'
        backgroundImage={Bluemoa}
        backgroundPosition='14px 3px'
        backgroundSize='30px'
        onClick={handleEmailLogin}
      >
        이메일 계정으로 로그인
      </StyledButton>
      <StyledButton
        borderColor='#ebce78'
        backgroundImage={kakao}
        backgroundPosition='16px 9px'
        backgroundSize='24px'
        opacity='0.5'
      >
        카카오톡 계정으로 로그인
      </StyledButton>
      <StyledButton
        borderColor='#eed3d3'
        backgroundImage={google}
        backgroundPosition='14px 6px'
        backgroundSize='30px'
        opacity='0.5'
      >
        구글 계정으로 로그인
      </StyledButton>
      <StyledButton
        borderColor='#a1e9a0'
        backgroundImage={naver}
        backgroundPosition='14px 6px'
        backgroundSize='30px'
        opacity='0.5'
      >
        네이버 계정으로 로그인
      </StyledButton>
    </BtnContainter>
  );
}
