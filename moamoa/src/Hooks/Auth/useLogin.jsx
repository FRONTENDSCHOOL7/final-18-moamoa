import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../API/Auth/AuthAPI';
import { useSetRecoilState } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import isLoginAtom from '../../Recoil/isLoginAtom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import userNameAtom from '../../Recoil/userNameAtom';
import { updateInputState } from '../../Utils/updateInputState';

const useLogin = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user: {
      email: '',
      password: '',
    },
  });
  const [loginFailMessage, setLoginFailMessage] = useState('');
  const [isTestAccount, setIsTestAccount] = useState(false);

  const setUserToken = useSetRecoilState(userTokenAtom);
  const setIsLoginState = useSetRecoilState(isLoginAtom);
  const setAccountName = useSetRecoilState(accountNameAtom);
  const setUserName = useSetRecoilState(userNameAtom);

  useEffect(() => {
    setUserToken('');
    setIsLoginState(false);
    setAccountName('');
    setUserName('');
  }, []);

  const updateUserData = (e) => {
    updateInputState(e, setUserData, 'user');
  };

  const loginWithTestAccount = () => {
    setIsTestAccount(!isTestAccount);
    console.log(isTestAccount);

    setUserData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        email: 'moa_festa@moamoa.com',
        password: '13231323',
      },
    }));
  };

  useEffect(() => {
    isTestAccount && performLogin();
  }, [isTestAccount]);

  const performLogin = async () => {
    const [res, error] = await login(userData);

    if (res && res.user) {
      const { token, accountname, username } = res.user;
      setUserToken(token);
      setIsLoginState(true);
      setAccountName(accountname);
      setUserName(username);
      localStorage.setItem('token', token);
      navigate('/home');
    } else if (res) {
      setLoginFailMessage(`*${res.message}`);
    } else if (error) {
      setLoginFailMessage(`*${error}`);
    }
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    await performLogin();
  };

  return {
    userData,
    updateUserData,
    submitLoginForm,
    loginFailMessage,
    loginWithTestAccount,
    isTestAccount,
  };
};

export default useLogin;
