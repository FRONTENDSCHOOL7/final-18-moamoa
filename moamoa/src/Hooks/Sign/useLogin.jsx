import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import LoginAPI from '../../API/Auth/LoginAPI';
import userTokenAtom from '../../Recoil/userTokenAtom';
import isLoginAtom from '../../Recoil/isLoginAtom';
import accountNameAtom from '../../Recoil/accountNameAtom';
import userNameAtom from '../../Recoil/userNameAtom';

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

  const setUserToken = useSetRecoilState(userTokenAtom);
  const setIsLoginState = useSetRecoilState(isLoginAtom);
  const setAccountName = useSetRecoilState(accountNameAtom);
  const setUserName = useSetRecoilState(userNameAtom);

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
