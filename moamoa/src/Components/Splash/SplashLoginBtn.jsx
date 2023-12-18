import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Bluemoa from '../../Assets/images/Bluemoa.png';
import kakao from '../../Assets/images/kakao.png';
import google from '../../Assets/images/google.png';
import naver from '../../Assets/images/naver.png';
import { Link, useNavigate } from 'react-router-dom';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { useRecoilValue } from 'recoil';
function TempLoginButton({ className, children }) {
  return <button className={className}>{children}</button>;
}

const StyledButton = styled(TempLoginButton)`
  margin: 0 auto;
  width: 322px;
  height: 44px;
  border-radius: 44px;
  background-color: #fff;
  color: #767676;
  background-repeat: no-repeat;
  font-size: 10px;
  margin: 0 0 10px 34px;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: ${({ backgroundSize }) => backgroundSize};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
  opacity: ${({ opacity }) => opacity};
`;
TempLoginButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
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
  return (
    <div>
      <Link to='/user/login'>
        <StyledButton
          borderColor='#017dc2'
          backgroundImage={Bluemoa}
          backgroundPosition='14px 3px'
          backgroundSize='30px'
        >
          이메일 계정으로 로그인
        </StyledButton>
      </Link>
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
    </div>
  );
}
