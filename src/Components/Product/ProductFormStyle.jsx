import styled, { css } from 'styled-components';
import Calendar from '../../Assets/icons/icon-calendar.png';
import UploadFile from '../../Assets/images/upload-file.png';

const COLORS = {
  primary: '#2E2C39',
  darkgray: '#767676',
};

const FONTSIZE = {
  sm: '14px',
  md: '16px',
  lg: '19px',
};

const LETTERSPACING = {
  narrow: '0.5px',
  normal: '1.5px',
  wide: '2px',
};

const titleStyle = css`
  font-size: ${FONTSIZE.md};
  letter-spacing: ${LETTERSPACING.narrow};
  margin-bottom: 10px;
`;

const contentStyle = css`
  font-family: 'Pretendard';
  font-size: ${FONTSIZE.md};
  letter-spacing: ${LETTERSPACING.normal};
  color: ${COLORS.darkgray};
`;

const borderStyle = css`
  outline: none;
  border: 1.2px solid ${COLORS.darkgray};

  &:focus {
    border-color: ${COLORS.primary};
    outline-color: ${COLORS.primary};
    transition: all 0.3s ease-in-out;
  }
`;

export const Form = styled.form`
  position: relative;
  margin: 0 auto;
  margin-top: 80px;
  background-color: #fff;
  color: ${COLORS.darkgray};
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    margin-top: 0px;
  }

  input[type='text'] {
    ${contentStyle}
    ${borderStyle}
    border: none;
    border-bottom: 1.2px solid ${COLORS.darkgray};
    &::-webkit-input-placeholder {
      ${contentStyle}
    }
  }

  input[type='date'] {
    ${contentStyle}
    ${borderStyle}
    border-radius: 5px;
    width: 47%;
    padding: 2px;

    //달력 커스텀
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
  }

  textarea {
    ${contentStyle}
    ${borderStyle}
    border-radius: 5px;
    resize: none;
    padding: 5px;
    height: 145px;
    &::-webkit-input-placeholder {
      ${contentStyle}
    }
  }

  max-width: 480px;
  @media (min-width: 768px) {
    padding-left: 120px;
  }
  @media (min-width: 1200px) {
    min-width: 480px;
    margin-left: 0px;
    padding-left: 270px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 34px;
  position: relative;
  margin-bottom: 35px;

  &:last-of-type {
    margin-bottom: 100px;
  }

  @media (min-width: 768px) {
    padding: 0;
    margin-bottom: 18px;

    &:last-of-type {
      margin-bottom: 18px;
    }
  }
`;

export const TitleH2 = styled.h2`
  ${titleStyle}
`;

export const TitleLabel = styled.label`
  ${titleStyle}
`;

export const ImgLabel = styled.label`
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
    right: 42px;
    bottom: 34px;
    background: url(${UploadFile}) 0 0 / cover;

    @media (min-width: 768px) {
      right: 8px;
    }
  }
`;

export const Img = styled.img`
  width: 100%;
  aspect-ratio: 358/228;
  object-fit: cover;
  border-radius: 10px;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Paragraph = styled.p`
  font-size: ${FONTSIZE.sm};
  letter-spacing: ${LETTERSPACING.narrow};
  margin-top: 6px;
  color: ${(props) => (props.role ? 'red' : COLORS.darkgray)};
  font-weight: ${(props) => props.role && 600};
  text-align: ${(props) => !props.role && 'right'};
`;

const Btn = styled.button`
  letter-spacing: ${LETTERSPACING.wide};
  // transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${COLORS.primary};
    color: white;
    border-color: ${COLORS.primary};
  }

  &:hover,
  &:focus {
    transition: all 0.2s ease-in-out;
  }
`;

export const ButtonTypeBtn = styled(Btn)`
  font-size: ${FONTSIZE.md};
  font-weight: 500;
  color: ${(props) => (props['aria-pressed'] ? 'white' : `${COLORS.darkgray}`)};
  background-color: ${(props) => (props['aria-pressed'] ? `${COLORS.primary}` : 'transparent')};
  border: ${(props) =>
    props['aria-pressed'] ? `1.2px solid ${COLORS.primary}` : `1.2px solid ${COLORS.darkgray}`};
  border-radius: 44px;
  padding: 8px;
  width: 49%;
`;

export const SubmitTypeBtn = styled(Btn)`
  font-size: ${FONTSIZE.lg};
  font-weight: 600;
  color: white;
  background-color: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};
  border: ${(props) => (props.$isfilled ? `${COLORS.primary}` : `${COLORS.darkgray}`)};
  position: fixed;
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;

  @media (min-width: 768px) {
    position: static;
    transform: none;
    border-radius: 32px;
    width: 100%;
    height: 50px;
    margin-bottom: 80px;
  }
`;
