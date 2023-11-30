import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { login } from '../../API/Sign/SignAPI';
import userTokenAtom from '../../Recoil/userTokenAtom';
import isLoginAtom from '../../Recoil/isLoginAtom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import userNameAtom from '../../Recoil/userNameAtom';

const useLogin = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [userData, setUserData] = useState({
    user: {
      email: 'moa_festa@moamoa.com',
      password: '13231323',
    },
  });

  const [userToken, setUserToken] = useRecoilState(userTokenAtom);
  const [isLoginState, setIsLoginState] = useRecoilState(isLoginAtom);
  const [accountName, setAccountName] = useRecoilState(accountNameAtom);
  const [userName, setUserName] = useRecoilState(userNameAtom);

  useEffect(() => {
    userToken && setUserToken('');
    isLoginState && setIsLoginState(false);
    accountName && setAccountName('');
    userName && setUserName('');
  }, []);

  const handleError = () => {
    const user = userData.user;
    if (!user.email && !user.password) {
      setErrorMsg('*이메일을 입력해주세요.');
    } else if (user.email && !user.password) {
      setErrorMsg('*비밀번호를 입력해주세요.');
    } else {
      setErrorMsg('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    setErrorMsg('');
    setUserErrorMessage('');
  };

  const handleLogin = async () => {
    const res = await login(userData);

    if (res && Object.prototype.hasOwnProperty.call(res, 'user')) {
      setUserToken(res.user.token);
      localStorage.setItem('token', res.user.token);
      setIsLoginState(true);
      setAccountName(res.user.accountname);
      setUserName(res.user.username);
      navigate('/home');
    } else if (res && !Object.prototype.hasOwnProperty.call(res, 'user')) {
      setUserErrorMessage(`*` + res.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return {
    userData,
    handleError,
    handleInputChange,
    handleFormSubmit,
    errorMsg,
    userErrorMessage,
  };
};

export default useLogin;
