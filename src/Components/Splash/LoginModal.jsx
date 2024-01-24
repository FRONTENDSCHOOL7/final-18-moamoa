import React, { useEffect } from 'react';
import SplashLoginBtn from './SplashLoginBtn';
import { Link } from 'react-router-dom';
import { LoginH1, Modal } from './SplashStyle';
import { useRecoilState } from 'recoil';
import { modalActiveState } from '../../Recoil/modalActiveState ';

export default function LoginModal() {
  const [modalActive, setModalActive] = useRecoilState(modalActiveState);
  useEffect(() => {
    const modalTimeout = setTimeout(() => {
      setModalActive(true);
    }, 3000);
    return () => clearTimeout(modalTimeout);
  }, []);

  return (
    <div>
      <Modal visible={modalActive ? true : false}>
        <LoginH1>로그인</LoginH1>
        <SplashLoginBtn></SplashLoginBtn>
        <p className='joinGuide'>아직 회원이 아니신가요?</p>
        <Link to='/user/signUp'>이메일로 회원가입</Link>
      </Modal>
    </div>
  );
}
