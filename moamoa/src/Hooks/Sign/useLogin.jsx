import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoginAPI from '../../API/Auth/LoginAPI';
import userTokenAtom from '../../Recoil/userTokenAtom';
import isLoginAtom from '../../Recoil/isLoginAtom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import userNameAtom from '../../Recoil/userNameAtom';
import followPostAtom from '../../Recoil/followPostAtom';

const useLogin = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [userInput, setUserInput] = useState({
    user: {
      email: 'green@green.com',
      password: 'greengreen',
    },
  });

  const [userToken, setUserToken] = useRecoilState(userTokenAtom);
  const [isLoginState, setIsLoginState] = useRecoilState(isLoginAtom);
  const [accountName, setAccountName] = useRecoilState(accountNameAtom);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [followPost, setFollowPost] = useRecoilState(followPostAtom);

  useEffect(() => {
    userToken && setUserToken('');
    isLoginState && setIsLoginState(false);
    accountName && setAccountName('');
    userName && setUserName('');
    followPost && setFollowPost([]);
  }, []);

  const handleError = () => {
    const user = userInput.user;
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
    setUserInput((prevState) => ({
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
    const res = await LoginAPI(userInput);

    if (res && Object.prototype.hasOwnProperty.call(res, 'user')) {
      setUserToken(res.user.token);
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
    userInput,
    handleError,
    handleInputChange,
    handleFormSubmit,
    errorMsg,
    userErrorMessage,
  };
};

export default useLogin;
