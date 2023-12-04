import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../API/Auth/AuthAPI.jsx';
import InputErrorMessagesReducer from './InputErrorMessagesReducer.jsx';
import { useImageUpload } from '../../Hooks/Common/useImageUpload.jsx';
import { updateInputState } from '../../Utils/updateInputState.jsx';
import DefaultProfileImage from '../../Assets/images/profile-img.svg';

const useSignUp = () => {
  const navigate = useNavigate();

  const [pageTransition, setPageTransition] = useState(false);
  const [userTypeErrorMessage, setUserTypeErrorMessage] = useState('');
  const [signUpFailMessage, setSignUpFailMessage] = useState('');

  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      accountname: '',
      intro: '',
      image: DefaultProfileImage,
    },
  });

  const [imgSrc, handleChangeImage] = useImageUpload('user', DefaultProfileImage, setUserData);

  const { errorMessages } = InputErrorMessagesReducer();

  const updateUserData = (e) => {
    updateInputState(e, setUserData, 'user');
  };

  const updateUserType = (e) => {
    setUserType(e.target.name);
  };

  const clickNextButton = (e) => {
    e.preventDefault();

    let userTypeError = !userType ? '회원타입을 설정해 주세요.' : '';
    setUserTypeErrorMessage(userTypeError);

    if (userType && !userTypeError && !errorMessages.emailError && !errorMessages.passwordError) {
      setPageTransition(true);
    }
  };

  const performSignUp = async () => {
    const userInfo = {
      ...userData,
      user: {
        ...userData.user,
        username:
          userType === 'individual'
            ? `[i]${userData.user.username}`
            : `[o]${userData.user.username}`,
      },
    };

    const res = await signUp(userInfo);
    if (res && res.message === '회원가입 성공') {
      navigate('/user/login');
    } else {
      setSignUpFailMessage(`*${res}`);
    }
  };

  const submitSignUpForm = async (e) => {
    e.preventDefault();
    if (
      !errorMessages.userNameError &&
      !errorMessages.accountNameError &&
      !errorMessages.introductionError
    ) {
      await performSignUp();
    }
  };

  return {
    userData,
    userType,
    pageTransition,
    userTypeErrorMessage,
    signUpFailMessage,
    imgSrc,
    handleChangeImage,
    updateUserData,
    updateUserType,
    clickNextButton,
    submitSignUpForm,
  };
};

export default useSignUp;
