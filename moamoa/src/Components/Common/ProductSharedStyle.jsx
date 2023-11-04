import styled from 'styled-components';
import Calendar from '../../Assets/icons/icon-calendar.png';
import UploadFile from '../../Assets/images/upload-file.png';

export const Form = styled.form`
  padding: 0 34px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background-color: #fff;
`;

export const Header = styled.header`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
`;

export const HeaderButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#D8E7F5' : '#87B7E4')};
  font-weight: 700;
  color: white;
  letter-spacing: -1px;
  width: 90px;
  height: 32px;
  border-radius: 32px;
`;

export const ImgLayoutContainer = styled.div`
  position: relative;

  h2 {
    color: #767676;
    margin-bottom: 18px;
  }

  p {
    color: #979797;
    text-align: right;
    margin-top: 7px;
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
    right: 10px;
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
  display: flex;
  flex-direction: column;

  label {
    color: #767676;
    margin-bottom: 9px;
  }
`;

export const SelectedButton = styled.button`
  color: ${(props) => (props.selected ? 'white' : '#DADADA')};
  background-color: ${(props) => (props.selected ? '#87b7e4' : 'transparent')};
  border: ${(props) => (props.selected ? '2px solid #87b7e4' : '2px solid #DADADA')};
  border-radius: 10px;
  font-weight: 700;
  width: 80px;
  height: 36px;
  letter-spacing: -1px;

  &:first-of-type {
    margin-right: 6px;
  }
`;

export const EventNameInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1.5px solid #dbdbdb;
  letter-spacing: -1px;

  &:focus {
    border-bottom: 1.5px solid #87b7e4;
    transition: all 0.3s ease-in-out;
  }
`;

export const PeriodInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PeriodInput = styled.input`
  border-radius: 5px;
  border: 2px solid #dbdbdb;
  width: 47%;
  padding: 2px;

  &:focus {
    border-color: #87b7e4;
    outline-color: #87b7e4;
  }

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

export const Textarea = styled.textarea`
  resize: none;
  padding: 5px;
  height: 145px;
  border-radius: 5px;
  border: 2px solid #dbdbdb;
  margin-bottom: 60px;
  font-size: 13px;

  &:focus {
    border-color: #87b7e4;
    outline-color: #87b7e4;
  }
`;

export const StyledErrorMsg = styled.div`
  color: red;
  margin-top: 6px;
`;
