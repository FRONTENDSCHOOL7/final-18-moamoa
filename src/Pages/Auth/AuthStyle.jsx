import styled, { css } from 'styled-components';
import Email from '../../Assets/icons/icon-email.svg';
import Lock from '../../Assets/icons/icon-lock.svg';
import UploadFile from '../../Assets/images/upload-file.png';
import { Link } from 'react-router-dom';

const COLORS = {
  primary: '#87b7e4',
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
  border-bottom: 1.5px solid ${COLORS.darkgray};
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
  background-color: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};
  border: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};
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
