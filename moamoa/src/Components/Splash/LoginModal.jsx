import React, { useEffect, useState } from 'react';
import SplashLoginBtn from './SplashLoginBtn';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function LoginModal() {
  const [modalActive, setModalActive] = useState(false);
  useEffect(() => {
    const modalTimeout = setTimeout(() => {
      setModalActive(true);
    }, 3000);
    return () => clearTimeout(modalTimeout);
  }, []);

  return (
    <div>
      <Modal visible={modalActive ? true : false}>
        <SplashLoginBtn></SplashLoginBtn>
        <p className='joinGuide'>아직 회원이 아니신가요?</p>
        <Link to='/user/signUp'>이메일로 회원가입</Link>
      </Modal>
    </div>
  );
}

const Modal = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  transform: translateX(-50%);
  position: fixed;
  bottom: ${(props) => (props.visible === true ? '0' : '-300px')};
  visibility: ${(props) => (props.visible === true ? 'visible' : 'hidden')};
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 390px;
  height: 400px;
  padding: 56px 0 20px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 4px 14px 6px rgba(0, 0, 0, 0.5);
  a,
  .joinGuide {
    margin: 0 auto;
    padding-top: 15px;
    color: #767676;
    font-size: 12px;
  }
  a:hover {
    font-size: 13px;
  }
`;
