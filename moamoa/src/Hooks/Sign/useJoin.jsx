import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinAPI from '../../API/Auth/JoinAPI';
import EmailValidAPI from '../../API/Valid/EmailValidAPI';

const useJoin = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [imgSrc, setImgSrc] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [pageTransition, setPageTransition] = useState(false);
  const [userType, setUserType] = useState('');
  const [userInfo, setUserInfo] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    setErrorMessage('');
  };

  const handleUserType = (e) => {
    const { name } = e.target;
    setUserType(name);
  };

  const handleEmailValid = async () => {
    const res = await EmailValidAPI({ user: { email: userInfo.user.email } });

    if (res) {
      setEmailError(`*` + res.message);
    }
  };

  const handleEmailOnBlur = async () => {
    await handleEmailValid();
  };

  const handlePasswordValid = () => {
    if (userInfo.user.password.length < 6) {
      setPasswordError('*비밀번호는 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const goNext = (e) => {
    e.preventDefault();
    if (userInfo.user.email && userInfo.user.password && !passwordError) {
      if (emailError === '*사용 가능한 이메일 입니다.') {
        setPageTransition(true);
      }
    }
  };

  const handleJoin = async () => {
    const res = await JoinAPI(userInfo, userType);

    if (res) {
      setErrorMessage(`*` + res.message);

      if (res.message === '회원가입 성공') {
        navigate('/user/login');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleJoin();
  };

  return {
    imgSrc,
    setImgSrc,
    userInfo,
    userType,
    setUserInfo,
    goNext,
    pageTransition,
    emailError,
    passwordError,
    errorMessage,
    handleSubmit,
    handleInputChange,
    handleUserType,
    handlePasswordValid,
    handleEmailOnBlur,
  };
};

export default useJoin;
