import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../API/Auth/AuthAPI.jsx';
import _ from 'lodash';
import InputErrorMessagesReducer from './InputErrorMessagesReducer.jsx';
import { updateInputState } from '../../Utils/updateInputState.jsx';
import DefaultProfileImage from '../../Assets/images/profile-img.svg';
import { useImage } from '../Common/useImage.jsx';

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

  const { imgData, showImgModal, onSelectFile, onCancel, setCroppedImageFor } =
    useImage(DefaultProfileImage);

  const { errorMessages } = InputErrorMessagesReducer();

  const updateUserData = (e) => {
    updateInputState(e, setUserData, 'user');
  };

  const updateUserType = (e) => {
    setUserType(e.target.name);
  };

  const clickNextButton = (e) => {
    e.preventDefault();

    let userTypeError = !userType ? '*회원타입을 설정해 주세요.' : '';
    setUserTypeErrorMessage(userTypeError);

    if (userType && !userTypeError && !errorMessages.emailError && !errorMessages.passwordError) {
      setPageTransition(true);
    }
  };

  const performSignUp = async () => {
    const prefix = userType === 'individual' ? '[i]' : '[o]';

    const userInfo = _.chain({ ...userData })
      .set('user.username', prefix + userData.user.username)
      .set('user.image', imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl)
      .value();

    console.log(userInfo);

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
    updateUserData,
    updateUserType,
    clickNextButton,
    submitSignUpForm,
    imgData,
    onCancel,
    onSelectFile,
    setCroppedImageFor,
    showImgModal,
  };
};

export default useSignUp;
