import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../API/Auth/AuthAPI.jsx';
import _ from 'lodash';
import InputErrorMessagesReducer from './InputErrorMessagesReducer.jsx';
import { handleUploadImage } from '../../Utils/handleUploadImage.jsx';
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

  const [imgSrc, setImgSrc] = useState({
    profile: {
      url: DefaultProfileImage,
      alt: '모아모아 기본 프로필 이미지',
    },
  });

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) {
      return;
    }

    const { imageUrl, imageAlt } = await handleUploadImage(imageFile);

    setUserData((prevState) => {
      const newState = _.cloneDeep(prevState);
      _.set(newState, 'user.image', imageUrl);
      return newState;
    });

    setImgSrc((prevState) => {
      const newState = _.cloneDeep(prevState);
      _.set(newState, 'profile.url', imageUrl);
      _.set(newState, 'profile.alt', imageAlt);
      return newState;
    });
  };

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
    const prefix = userType === 'individual' ? '[i]' : '[o]';
    const userInfo = _.set({ ...userData }, 'user.username', prefix + userData.user.username);

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
