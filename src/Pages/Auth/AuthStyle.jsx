import styled, { css } from 'styled-components';
import Email from '../../Assets/icons/icon-email.svg';
import Lock from '../../Assets/icons/icon-lock.svg';
import UploadFile from '../../Assets/images/upload-file.png';
import { Link } from 'react-router-dom';

const COLORS = {
  primary: '#2E2C39',
  darkgray: '#767676',
};

const FONTSIZE = {
  sm: '14px',
  md: '16px',
  lg: '27px',
};

const LETTERSPACING = {
  narrow: '0.5px',
  normal: '1.5px',
  wide: '2px',
};

export const Container = styled.div`
@media (min-width: 768px) {
  display: flex;
  flex-direction: row-reverse;
  background-color: ${COLORS.primary};;
  height: 100vh;
  overflow: hidden;
}
`

export const SplashBg = styled.div`
  display: none;  
  @media (min-width: 768px) {
    display: block;
    width: 50vw;
    height: 100vh;
  }
`

export const ProfileSetBg = styled.div`
  @media (min-width: 768px) {
    display: block;
    width: 50vw;
    height: 100vh;
    background-color: #fff;
    z-index: 300;
  }
`


export const SVGgroup = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  gap: 5px;
  .blinkFestival {
    margin-top: 150px;
    width: 109px;
    height: 13px;
    transform: translateX(-40%);
  }
  .blinkfireworks {
    transform: translate(57%, 20%);
    width: 57px;
    height: 57px;
  }
  .logotext{
    color: #fff;
    margin-top: 8px;
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: 300;
  }
  img {
    width: 202px;
  }
  @media (min-width: 768px) {
    .blinkFestival {
      margin-top: 0px;
    }
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 29%;
    left: ${(props) => (props.visible === true ? '-25%' : '0%')};
    transition: 0.5s ease;
  }
`;

export const AnimationFireworks = styled.div`
  @media (min-width: 768px) {
    position: relative;
    width: 50vw;
    height: 30vh;
    left: -30%;
    top: -300px;
  }
  [class^='firework-'] {
    z-index: 500;
    position: absolute;
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
  }
  .firework-1 {
    animation: firework-sm 1.2s both infinite;
    animation-delay: 1.1s;
    top: 15%;
    left: 15%;
  }
  .firework-2 {
    animation: firework-lg 1.2s both infinite;
    animation-delay: 0.8s;
    top: 10%;
    left: 19%;
  }
  .firework-3 {
    animation: firework-lg 1.2s both infinite;
    animation-delay: 0.3s;
    top: 5%;
    left: 27%;
  }
  .firework-4 {
    animation: firework-md 1.2s both infinite;
    animation-delay: 1.3s;
    top: 14%;
    left: 31%;
  }
  .firework-5 {
    animation: firework-md 1.2s both infinite;
    animation-delay: 1.4s;
    top: 25%;
    left: 20%;
  }
  .firework-6 {
    animation: firework-md 1.2s both infinite;
    animation-delay: 0.4s;
    top: 16%;
    left: 82%;
  }
  .firework-7 {
    animation: firework-lg 1.2s both infinite;
    animation-delay: 0.2s;
    top: 27%;
    left: 75%;
  }
  .firework-8 {
    animation: firework-sm 1.2s both infinite;
    animation-delay: 0.2s;
    top: 10%;
    left: 79%;
  }
  .firework-9 {
    animation: firework-md 1.4s both infinite;
    animation-delay: 0.6s;
    top: 12%;
    left: 59%;
  }
  .firework-10 {
    animation: firework-lg 1.5s both infinite;
    animation-delay: 0.8s;
    top: 14%;
    left: 49%;
  }
  .firework-11 {
    animation: firework-lg 1.5s both infinite;
    animation-delay: 0.8s;
    top: 4%;
    left: 49%;
  }
  .firework-12 {
    animation: firework-md 1.3s both infinite;
    animation-delay: 0.8s;
    top: 33%;
    left: 40%;
  }
  .firework-13 {
    animation: firework-lg 1.1s both infinite;
    animation-delay: 0.8s;
    top: 30%;
    left: 58%;
  }
  @media (min-width: 768px) {
    .firework-1 {
      top: 45%;
      left: -19%;
    }
    .firework-2 {
      top: 40%;
      left: 9%;
    }
    .firework-3 {
      top: 75%;
    }
    .firework-4 {
      top: 194%;
    }
    .firework-5 {
      top: 95%;
      left: 85%;
    }
    .firework-6 {
      top: 120%;
      left: 130%;
    }
    .firework-7 {
      top: 57%;
      left: 130%;
    }
    .firework-8 {
      top: 10%;
      left: 130%;
    }
    .firework-9 {
      top: 42%;
      left: 110%;
    }
    .firework-10 {
      top: 24%;
      left: 100%;
    }
    .firework-11 {
      top: 126%;
      left: 30%;
    }
    .firework-12 {
      top: 166%;
      left: 110%;
    }
    .firework-13 {
      top: 160%;
    }
  }

  @keyframes firework-sm {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    70% {
      opacity: 1;
    }
    100% {
      box-shadow:
        -2rem 0rem 0 #c683d7,
        2rem 0rem 0 #c683d7,
        0rem -2rem 0 #c683d7,
        0rem 2rem 0 #c683d7,
        1.3rem -1.3rem 0 #c683d7,
        1.3rem 1.3rem 0 #c683d7,
        -1.3rem -1.3rem 0 #c683d7,
        -1.3rem 1.3rem 0 #c683d7;
    }
  }
  @keyframes firework-md {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    70% {
      opacity: 1;
    }
    100% {
      box-shadow:
        -3rem 0rem 0 #ff6969,
        3rem 0rem 0 #ff6969,
        0rem -3rem 0 #ff6969,
        0rem 3rem 0 #ff6969,
        2rem -2rem 0 #ff6969,
        2rem 2rem 0 #ff6969,
        -2rem -2rem 0 #ff6969,
        -2rem 2rem 0 #ff6969;
    }
  }
  @keyframes firework-lg {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    70% {
      opacity: 1;
    }
    100% {
      box-shadow:
        -4rem 0rem 0 #609966,
        4rem 0rem 0 #609966,
        0rem -4rem 0 #609966,
        0rem 4rem 0 #609966,
        3rem -3rem 0 #609966,
        3rem 3rem 0 #609966,
        -3rem -3rem 0 #609966,
        -3rem 3rem 0 #609966;
    }
  }
`;

export const Copyright = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  margin-top: 370px;
  color: #ffffff;
  font-size: 14px;
  @media (min-width: 768px) {
    position: absolute;
    bottom: 10%;
    transition: 0.5s ease;
    left: ${(props) => (props.visible === true ? '25%' : '50%')};
    transform: translateX(-50%);
  }
`;


export const ProfileSetContainer = styled.div`
  margin: 0 auto;
  max-width: var(--small);
  width: 100%;
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  @media (min-width: 768px) {
    max-width: 480px;
    margin-top: 5%;
  }
`;

const buttonStyle = css`
  font-size: ${FONTSIZE.md};
  font-weight: 600;
  border-radius: 44px;
  padding: 13px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${COLORS.primary};
    color: white;
    border-color: ${COLORS.primary};
  }
`;

const titleHeadStyle = css`
  text-align: center;
  font-size: ${FONTSIZE.lg};
  margin-top: 30px;
  letter-spacing: ${LETTERSPACING.normal};
`;

export const TitleH1 = styled.h1`
  ${titleHeadStyle}
`;
export const TitleH2 = styled.h2`
  ${titleHeadStyle}
`;

export const Form = styled.form`
  padding: 0 34px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  color: ${COLORS.darkgray};

  margin-top: 60px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #dbdbdb;
  font-size: ${FONTSIZE.md};
  letter-spacing: ${LETTERSPACING.wide};
  background-image: url(${(props) =>
    props.type === 'email' ? Email : props.type === 'password' ? Lock : 'none'});
  background-repeat: no-repeat;
  background-position: 2% 50%;
  padding: ${(props) => (props.type === 'text' ? '5px 0' : '16px 0 16px 36px')};

  &::-webkit-input-placeholder {
    font-family: 'Pretendard';
  }

  &:focus {
    border-bottom: 1.5px solid ${COLORS.primary};
    transition: all 0.3s ease-in-out;
  }
  @media (min-width: 768px) {
    background-position: 1% 50%;
  }
`;

export const LongBtn = styled.button`
  ${buttonStyle}
  width: 100%;
  letter-spacing: ${LETTERSPACING.wide};

  color: white;
  background-color: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `#aaa`)};
  border: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `#aaa`)};
`;

export const AlertParagraph = styled.p`
  color: red;
  text-align: left;
  margin-top: 5px;
  font-size: ${FONTSIZE.sm};
  font-weight: 500;
  letter-spacing: ${LETTERSPACING.narrow};
`;

// 이메일로 회원가입
export const UserTypeContainer = styled.div`
  margin-bottom: 30px;

  h3 {
    text-align: left;
    font-size: ${FONTSIZE.md};
    margin-bottom: 12px;
  }
`;

export const UserTypeBtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserTypeBtn = styled.button`
  ${buttonStyle}
  width: 48%;
  letter-spacing: ${LETTERSPACING.normal};

  color: ${(props) => (props['aria-pressed'] ? 'white' : `${COLORS.darkgray}`)};
  background-color: ${(props) => (props['aria-pressed'] ? `${COLORS.primary}` : 'transparent')};
  border: ${(props) =>
    props['aria-pressed'] ? `1.5px solid ${COLORS.primary}` : `1.5px solid ${COLORS.darkgray}`};
`;

export const NextBtn = styled(LongBtn)`
  margin: 140px 0 40px 0;
`;

// 프로필 설정
export const Paragraph = styled.p`
  text-align: center;
  color: ${COLORS.darkgray};
  font-size: ${FONTSIZE.md};
  margin-top: 10px;
`;

export const ProfileForm = styled(Form)`
  margin-top: 30px;
  margin-bottom: 60px;
  gap: 30px;
`;

export const ProfileFormSubContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:first-of-type {
    align-items: center;
  }
`;

export const ImgLabel = styled.label`
  display: block;
  width: 130px;
  height: 130px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: -5px;
    bottom: 0;
    background: url(${UploadFile}) 0 0 / cover;
  }
`;

export const TitleLabel = styled.label`
  margin-bottom: 5px;
  font-size: ${FONTSIZE.md};
`;

export const SignUpBtn = styled(LongBtn)`
  margin: 35px 0 40px 0;
`;

// 로그인
export const LoginBtnsContainer = styled.div`
  margin-top: 160px;
  display: grid;
  gap: 10px;
`;

export const LinkToSignUp = styled(Link)`
  margin: 40px 0;
  font-size: ${FONTSIZE.md};
  letter-spacing: ${LETTERSPACING.narrow};
  text-align: center;
  font-weight: 500;

  &:hover {
    color: ${COLORS.primary};
  }
`;
