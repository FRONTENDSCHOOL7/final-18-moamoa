import React, { useEffect, useState } from 'react';
import SplashLoginBtn from './SplashLoginBtn';
import { Link } from 'react-router-dom';
import { Modal } from './SplashStyle';

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
