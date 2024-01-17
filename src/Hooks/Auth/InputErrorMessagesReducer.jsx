import { useReducer } from 'react';
import { verifyEmail, verifyAccountName } from '../../API/Auth/AuthAPI';

const InputErrorMessagesReducer = () => {
  const [errorMessages, dispatchErrorMessage] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_ERROR_MESSAGE':
          return { ...state, [action.field]: action.payload };
        default:
          throw new Error();
      }
    },
    {
      passwordError: '',
      userNameError: '',
      introductionError: '',
      emailError: '',
      accountNameError: '',
    },
  );

  const checkInputLength = (event, field, minLength, errorMsg) => {
    const { value } = event.target;
    dispatchErrorMessage({
      type: 'SET_ERROR_MESSAGE',
      field,
      payload: value.length < minLength ? errorMsg : '',
    });
  };

  const checkPasswordLength = (event) => {
    checkInputLength(event, 'passwordError', 6, '*비밀번호는 6자 이상이어야 합니다.');
  };

  const checkUserNameLength = (event) => {
    checkInputLength(event, 'userNameError', 2, '*사용자 이름은 2자 이상이어야 합니다.');
  };

  const checkIntroductionLength = (event) => {
    checkInputLength(event, 'introductionError', 2, '*소개는 2자 이상이어야 합니다.');
  };

  const validateInputWithAPI = async (event, verifier, field) => {
    const { name, value } = event.target;

    const userInput = { user: { [name]: value } };
    const errorMsg = await verifier(userInput);
    dispatchErrorMessage({ type: 'SET_ERROR_MESSAGE', field, payload: errorMsg });
  };

  const validateEmailWithAPI = (event) => {
    validateInputWithAPI(event, verifyEmail, 'emailError');
  };

  const validateAccountNameWithAPI = (event) => {
    validateInputWithAPI(event, verifyAccountName, 'accountNameError');
  };

  return {
    errorMessages,
    checkPasswordLength,
    checkUserNameLength,
    checkIntroductionLength,
    validateEmailWithAPI,
    validateAccountNameWithAPI,
  };
};

export default InputErrorMessagesReducer;
