import styled, { css } from 'styled-components';
import Calendar from '../../Assets/icons/icon-calendar.png';
import UploadFile from '../../Assets/images/upload-file.png';

const COLORS = {
  primary: '#87b7e4',
  darkgray: '#767676',
  // lightgray: '#dbdbdb', //명암비: 1.38 // https://sitero.co.kr/contrast
};

const borderline = `1.2px solid ${COLORS.darkgray}`;

const FlexColumn = css`
  display: flex;
  flex-direction: column;
`;

const BorderStyle = css`
  outline: none;

  &:focus {
    border-color: ${COLORS.primary};
    outline-color: ${COLORS.primary};
    transition: all 0.3s ease-in-out;
  }
`;

const BtnHoverStyle = css`
  &:hover {
    background-color: ${COLORS.primary};
    color: white;
    border-color: ${COLORS.primary};
  }
`;

export const Form = styled.form`
  position: relative;

  margin-top: 80px;
  background-color: #fff;
  font-size: 13px;
  color: ${COLORS.darkgray};

  ${FlexColumn}
  & > *:not(:nth-child(6)) {
    margin-bottom: 24px;
  }

  & > *:nth-child(7) {
    margin-top: 20px;
    margin-bottom: 100px;
  }

  h2,
  label {
    margin-bottom: 9px;
  }

  p {
    margin-top: 6px;
    color: ${COLORS.darkgray};
  }

  textarea {
    resize: none;
    padding: 5px;
    height: 145px;
    color: ${COLORS.darkgray};

    // margin-bottom: 60px;
    border: ${borderline};
    border-radius: 5px;

    ${BorderStyle}
  }

  input[type='text']::-webkit-input-placeholder {
    font-size: 13px;
    color: ${COLORS.darkgray};
    font-family: 'Pretendard';
  }

  textarea::-webkit-input-placeholder {
    font-size: 13px;
    color: ${COLORS.darkgray};
    font-family: 'Pretendard';
  }

  .dateinput-container {
    display: flex;
    justify-content: space-between;
  }

  .error-msg {
    color: red;
  }
`;

export const ImgLayoutContainer = styled.div`
  position: relative;
  padding: 0 34px;

  p {
    text-align: right;
    font-size: 12px;
  }

  .hidden-but-accessible {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
`;

export const ImageLabel = styled.label`
  display: block;
  width: 100%;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: 40px;
    bottom: 30px;
    background: url(${UploadFile}) 0 0 / cover;
  }
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 322/204;
  object-fit: cover;
  border-radius: 10px;
`;

export const LayoutContainer = styled.div`
  ${FlexColumn}
  padding: 0 34px;
`;

export const Button = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props['aria-pressed'] ? 'white' : `${COLORS.darkgray}`)};
  background-color: ${(props) => (props['aria-pressed'] ? `${COLORS.primary}` : 'transparent')};
  border: ${(props) =>
    props['aria-pressed'] ? `1.2px solid ${COLORS.primary}` : `1.2px solid ${COLORS.darkgray}`};
  transition: all 0.2s ease-in-out;
  border-radius: 32px;
  width: 90px;
  height: 34px;

  &:first-of-type {
    margin-right: 6px;
  }

  ${BtnHoverStyle}
`;

export const TextInput = styled.input`
  ${BorderStyle}
  border: none;
  border-bottom: ${borderline};
  color: ${COLORS.darkgray};
`;

export const DateInput = styled.input`
  ${BorderStyle}
  width: 47%;
  padding: 2px;
  border-radius: 5px;
  border: ${borderline};
  color: ${COLORS.darkgray};

  &::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    display: block;
    background: url(${Calendar}) no-repeat;
    background-position: 1% 50%;
    width: 12px;
    height: 13px;
    border-width: thin;
  }
`;

export const SubmitErrorMsg = styled.p`
  text-align: center;
  font-weight: 600;
`;

export const SubmitBtn = styled.button`
  background-color: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};
  border: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};
  font-weight: 600;
  font-size: 15px;
  color: white;

  ${BtnHoverStyle}
  position: fixed;
  width: 390px;
  height: 60px;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
`;
